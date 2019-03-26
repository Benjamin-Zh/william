const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { APP_MODE } = require('../../constants');
const { SRC_PATH } = require('../../constants/paths');
const message = require('../../utils/message');


async function resolvePages({ appMode, pagesPath }) {
  // const entries = {};
  let pages;

  // sp
  if (appMode === APP_MODE.SP) {
    pages = [{
      name: 'index',
      path: SRC_PATH,
    }];
  }

  // mp
  if (appMode === APP_MODE.MP) {
    const absPagesPath = path.resolve(SRC_PATH, pagesPath);
    let readPages;

    // read pagesPath to find out all pages
    try {
      readPages = await promisify(fs.readdir)(absPagesPath);
      readPages = readPages
        .map(page => ({ name: page.toLowerCase(), path: path.resolve(absPagesPath, page) }))
        .filter(page => fs.statSync(page.path).isDirectory());
    } catch (err) {
      message.fatal(`Can not read pages path '${pagesPath}'.`);
      process.exit(1);
    }

    pages = readPages;
  }

  return pages;
}

module.exports = resolvePages;
