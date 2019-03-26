const webpack = require('webpack');
const isString = require('lodash/isString');
const isPlainObject = require('lodash/isPlainObject');
const cloneDeepWith = require('lodash/cloneDeepWith');


function formatDefinePluginOptions(rawOptions) {
  return cloneDeepWith(
    rawOptions,
    value => (isString(value) ? JSON.stringify(value) : undefined),
  );
}

module.exports = (key, value) => {
  const isKeyString = isString(key);

  if (!isKeyString && !isPlainObject(key)) {
    throw new TypeError(`Invalid parameter ${key}`);
  }

  return {
    plugins: [
      new webpack.DefinePlugin(
        formatDefinePluginOptions(isKeyString ? { [key]: value } : key),
      ),
    ],
  };
};
