const { isString } = require('lodash/lang');


function formatOptions(options) {
  const res = { ...options };

  if (isString(options.appMode)) {
    res.appMode = options.appMode.toUpperCase();
  }

  return res;
}

module.exports = formatOptions;
