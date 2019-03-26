const merge = require('webpack-merge');
const setMode = require('./lib/setMode');
const loadStyles = require('./lib/loadStyles');
const loadImages = require('./lib/loadImages');
const loadWorkers = require('./lib/loadWorkers');
const splitChunks = require('./lib/splitChunks');
const setHMR = require('./lib/setHMR');
const optimizeWDS = require('./lib/optimizeWDS');
const { ENV, APP_MODE } = require('../constants');


module.exports = options => merge([
  setMode(ENV.DEVELOPMENT),
  loadStyles({
    cssModules: true,
    globalStylePath: options.globalStylePath,
  }),
  loadImages(),
  loadWorkers(),
  splitChunks({ enabled: false }),
  setHMR(),
  optimizeWDS({
    isSp: options.appMode === APP_MODE.SP,
  }),
]);
