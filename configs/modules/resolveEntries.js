const { resolveModule } = require('../../utils');
const { APP_MODE, JS_EXTENSIONS } = require('../../constants');
const { SRC_PATH } = require('../../constants/paths');


module.exports = ({ appMode, pages }) => {
  let entries;

  // sp
  if (appMode === APP_MODE.SP) {
    entries = { main: resolveModule(SRC_PATH, JS_EXTENSIONS) };
  }

  // mp
  if (appMode === APP_MODE.MP) {
    entries = {};
    pages
      .map(page => ({ ...page, path: resolveModule(page.path, JS_EXTENSIONS) }))
      .forEach((page) => { entries[page.name] = page.path; });
  }

  return entries;
};
