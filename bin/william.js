#!/usr/bin/env node
const program = require('commander');
const serve = require('../commands/serve');
const build = require('../commands/build');
const { version } = require('../package.json');


program
  .version(version, '-v, --version');

program
  .command('serve')
  .description('run development server')
  .action((...args) => serve(true, ...args));

program
  .command('build')
  .description('build for production')
  .option('-m, --measure', 'measure build progress')
  .action((...args) => build(true, ...args));

program.parse(process.argv);
