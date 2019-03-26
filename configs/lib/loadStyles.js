/* eslint-disable no-param-reassign */
const path = require('path');
const glob = require('glob');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const { APP_ROOT_PATH, SRC_PATH, NODE_MODULES_PATH } = require('../../constants/paths');
const { toArray } = require('../../utils');
const message = require('../../utils/message');


module.exports = ({
  extract = false,
  purge = false,
  cssModules = false,
  globalStylePath,
  localIdentName = '[path][name]__[local]--[hash:base64:5]',
} = {}) => {
  // format extract
  if (purge && !extract) {
    message.warn('You need extract css file when purge, auto set \'extract\' to true.');
    extract = true;
  }

  // format localIdentName
  /* "np" below is short for "not purge",
   * see https://github.com/webpack-contrib/purifycss-webpack#usage-with-css-modules.
   */
  if (purge && !/-np$/.test(localIdentName)) {
    localIdentName = `${localIdentName}-np`;
  }

  // format globalStylePath
  globalStylePath = toArray(globalStylePath);
  globalStylePath.push(NODE_MODULES_PATH);
  globalStylePath = globalStylePath.map(item => path.resolve(APP_ROOT_PATH, item));

  function useLoaders({ preprocessor, modules = false } = {}) {
    const loaders = [
      extract ? MiniCSSExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { modules, localIdentName },
      },
      'postcss-loader',
    ];

    if (preprocessor) {
      loaders.push(
        'resolve-url-loader',
        preprocessor,
      );
    }

    return loaders;
  }

  function generateRules({ include, exclude, modules } = {}) {
    const sassPreprocessor = {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        sourceMapContents: false,
      },
    };

    return [
      {
        test: /\.css$/,
        use: useLoaders({ modules }),
        include,
        exclude,
      },
      {
        test: /\.scss$/,
        use: useLoaders({
          modules,
          preprocessor: sassPreprocessor,
        }),
        include,
        exclude,
      },
      {
        test: /\.less$/,
        use: useLoaders({
          modules,
          preprocessor: 'less-loader',
        }),
        include,
        exclude,
      },
    ];
  }

  const configFragment = {
    module: {
      rules: [],
    },
    plugins: [],
  };

  // play with css modules
  if (cssModules) {
    configFragment.module.rules.push(
      ...generateRules({ include: globalStylePath }),
      ...generateRules({ modules: true, include: SRC_PATH, exclude: globalStylePath }),
    );
  } else {
    configFragment.module.rules.push(
      ...generateRules(),
    );
  }

  if (extract) {
    configFragment.plugins.push(
      new MiniCSSExtractPlugin({
        filename: '[name].[contenthash:5].css',
      }),
    );
  }

  if (purge) {
    configFragment.plugins.push(new PurgecssWebpackPlugin({
      paths: glob.sync(`${SRC_PATH}/**/*`, { nodir: true }),
      /* "np" below is short for "not purge",
       * see https://github.com/webpack-contrib/purifycss-webpack#usage-with-css-modules.
       */
      whitelistPatterns: [/-np$/],
    }));
  }

  return configFragment;
};
