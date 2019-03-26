const path = require('path');


const CWD = process.cwd();

module.exports = {
  APP_ROOT_PATH: CWD,
  DIST_PATH: path.resolve(CWD, './dist'),
  SRC_PATH: path.resolve(CWD, './src'),
  NODE_MODULES_PATH: path.resolve(CWD, 'node_modules'),
  CONFIG_PATH: path.resolve(__dirname, '../configs/index.js'),
};
