const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (minimize) => {
  const configFragment = {
    optimization: {
      minimize,
    },
    plugins: [],
  };

  if (minimize) {
    configFragment.plugins.push(
      new OptimizeCSSAssetsWebpackPlugin(),
    );
  }

  return configFragment;
};
