const chalk = require('chalk');


function lineSpace(content) {
  return `\n${content}\n`;
}

function fatal(message) {
  console.log(chalk.red.bold(lineSpace(message)));
}

function warn(message) {
  console.log(chalk.yellow.bold(lineSpace(message)));
}

module.exports = {
  fatal,
  warn,
};
