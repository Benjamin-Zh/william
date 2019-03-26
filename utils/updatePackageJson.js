const fs = require('fs');
const path = require('path');
const { APP_ROOT_PATH } = require('../constants/paths');


function updatePackageJson(key, value) {
  const packageJsonPath = path.resolve(APP_ROOT_PATH, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

  packageJson[key] = value;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
}

module.exports = updatePackageJson;
