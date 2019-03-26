const Ajv = require('ajv');
const chalk = require('chalk');
const schema = require('../constants/schema');


function validateOptions(options) {
  const ajv = new Ajv();
  const validator = ajv.compile(schema);
  const valid = validator(options);
  const res = { valid };

  if (!valid) res.errors = validator.errors;

  return res;
}

function throwValidationError(error) {
  const name = error.dataPath.slice(1);
  const message = `Property '${name}' ${error.message}`;

  console.log(chalk.red.bold(`Invalid configuration object. ${message}.`));
}

module.exports = {
  validateOptions,
  throwValidationError,
};
