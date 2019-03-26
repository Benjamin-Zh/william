const fs = require('fs');


function toArray(raw) {
  return Array.isArray(raw) ? raw : [raw];
}

function ensureSlash(raw) {
  return /\/$/.test(raw) ? raw : `${raw}/`;
}

function resolveModule(path, extensions = [], filename = 'index') {
  let res;

  extensions.some((extension) => {
    const modulePath = `${ensureSlash(path)}${filename}${extension}`;

    try {
      fs.accessSync(modulePath);
    } catch (err) {
      return false;
    }

    res = modulePath;
    return true;
  });

  return res;
}

module.exports = {
  toArray,
  ensureSlash,
  resolveModule,
};
