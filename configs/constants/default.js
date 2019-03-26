const { NODE_MODULES_PATH } = require('../../constants/paths');


module.exports = {
  env: 'production',
  measure: false,
  appMode: 'sp',
  pagesPath: 'pages',
  cssModules: false,
  globalStylePath: [
    'src/styles/global',
    NODE_MODULES_PATH,
  ],
};
