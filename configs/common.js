const merge = require('webpack-merge');
const { SRC_PATH } = require('../constants/paths');
const setEntries = require('./lib/setEntries');
const emitHTML = require('./lib/emitHTML');
const setExtensionSupport = require('./lib/setExtensionSupport');
const loadJavaScript = require('./lib/loadJavaScript');
const loadFonts = require('./lib/loadFonts');
const setFreeVariables = require('./lib/setFreeVariables');
const setAlias = require('./lib/setAlias');
const { JS_EXTENSIONS } = require('../constants');


module.exports = options => merge([
  setEntries({
    entries: options.entries,
  }),
  emitHTML({
    pages: options.pages,
    appMode: options.appMode,
  }),
  setExtensionSupport(JS_EXTENSIONS),
  loadJavaScript(),
  loadFonts(),
  setFreeVariables('BUILD_TIME', Date.now()),
  setAlias({ '@': SRC_PATH }),
]);
