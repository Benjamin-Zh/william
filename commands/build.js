const cp = require('child_process');
const { ENV } = require('../constants');
const { CONFIG_PATH } = require('../constants/paths');
const pickCmdOptions = require('../utils/pickCmdOptions');
const findWebpackBin = require('../utils/findWebpackBin');


function build(isCli, ...args) {
  const wdsArgs = [
    '--config', CONFIG_PATH,
    '--env', ENV.PRODUCTION,
    '--progress',
  ];
  const spawnOptions = {
    stdio: 'inherit',
    env: {
      ...process.env,
      cmdOptions: JSON.stringify(
        isCli
          ? pickCmdOptions(args)
          : args[0] || null,
      ),
    },
  };

  cp.spawn(findWebpackBin('webpack'), wdsArgs, spawnOptions);
}

module.exports = build;
