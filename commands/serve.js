const cp = require('child_process');
const { ENV } = require('../constants');
const { CONFIG_PATH } = require('../constants/paths');
const pickCmdOptions = require('../utils/pickCmdOptions');
const findWebpackBin = require('../utils/findWebpackBin');


function serve(isCli, ...args) {
  const wdsArgs = [
    '--config', CONFIG_PATH,
    '--env', ENV.DEVELOPMENT,
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

  cp.spawn(findWebpackBin('webpack-dev-server'), wdsArgs, spawnOptions);
}

module.exports = serve;
