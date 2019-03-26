const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-dir');


function findWebpackBin(moduleName) {
  try {
    const moduleDir = pkgDir.sync(require.resolve(moduleName));
    const packageJsonPath = path.resolve(moduleDir, 'package.json');
    let binPath;

    fs.accessSync(packageJsonPath);

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const { bin: binField } = require(packageJsonPath);

    if (!binField) throw new Error('No bin field found in package.json file.');
    if (typeof binField === 'string') binPath = binField;
    if (binField[moduleName]) binPath = binField[moduleName];

    return path.resolve(moduleDir, binPath);
  } catch (err) {
    return null;
  }
}

module.exports = findWebpackBin;
