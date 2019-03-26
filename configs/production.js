const merge = require('webpack-merge');
const setMode = require('./lib/setMode');
const cleanDist = require('./lib/cleanDist');
const loadStyles = require('./lib/loadStyles');
const loadImages = require('./lib/loadImages');
const loadWorkers = require('./lib/loadWorkers');
const setMinimization = require('./lib/setMinimization');
const splitChunks = require('./lib/splitChunks');
const optimizeProduction = require('./lib/optimizeProduction');
const setOutput = require('./lib/setOutput');
const { ENV } = require('../constants');


module.exports = options => merge([
  setMode(ENV.PRODUCTION),
  cleanDist(),
  loadStyles({
    extract: true,
    purge: true,
    minimize: true,
    cssModules: options.cssModules,
    globalStylePath: options.globalStylePath,
    localIdentName: '[hash:base64:5]',
  }),
  loadImages({
    minimize: true,
    fileOptions: {
      limit: 20000,
      outputPath: 'images',
      name: '[name].[hash:5].[ext]',
    },
  }),
  loadWorkers({ name: '[contenthash:5].worker.js' }),
  setMinimization(true),
  splitChunks({ enabled: true }),
  optimizeProduction(),
  setOutput(),
]);
