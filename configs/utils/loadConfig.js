const merge = require('webpack-merge');
const cosmiconfig = require('cosmiconfig');
const defaultConfig = require('../constants/default');


function loadConfig(name) {
  const explorer = cosmiconfig(name);
  const searchRes = explorer.searchSync();

  if (!searchRes || (searchRes && searchRes.isEmpty)) {
    return defaultConfig;
  }

  // todo:
  // i'm using webpack-merge for configuration merger.
  // don't know if there is any bugs...
  return merge([
    defaultConfig,
    searchRes.config,
  ]);
}

module.exports = loadConfig;
