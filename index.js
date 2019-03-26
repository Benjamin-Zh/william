const serve = require('./commands/serve');
const build = require('./commands/build');


module.exports = {
  serve(...args) { serve(false, ...args); },
  build(...args) { build(false, ...args); },
};
