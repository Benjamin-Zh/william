const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { ENV } = require('../constants');
const loadConfig = require('./utils/loadConfig');
const formatOptions = require('./utils/formatOptions');
const { validateOptions, throwValidationError } = require('./utils/validateOptions');
const getCommonConfig = require('./common');
const getDevelopmentConfig = require('./development');
const getProductionConfig = require('./production');
const resolvePages = require('./modules/resolvePages');
const resolveEntries = require('./modules/resolveEntries');


module.exports = async (env = ENV.PRODUCTION) => {
  const options = {
    ...loadConfig('william'),
    ...JSON.parse(process.env.cmdOptions),
    ...{ env },
  };

  // validate options
  const {
    valid,
    errors: validateErrors,
  } = validateOptions(formatOptions(options));

  if (!valid) {
    throwValidationError(validateErrors.shift());
    process.exit(1);
  }

  // set environment variables
  process.env.NODE_ENV = env;
  process.env.BABEL_ENV = env;

  // resolve pages and entries
  options.pages = await resolvePages(options);
  options.entries = resolveEntries(options);

  // construct config file
  const configGenerators = {
    [ENV.DEVELOPMENT]: getDevelopmentConfig,
    [ENV.PRODUCTION]: getProductionConfig,
  };
  const config = merge(
    await getCommonConfig(options),
    configGenerators[env](options),
  );

  // todo: merge with william.rc's webpackConfig

  return options.measure
    ? new SpeedMeasurePlugin().wrap(config)
    : config;
};
