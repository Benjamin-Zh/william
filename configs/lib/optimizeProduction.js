const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = () => ({

  // split webpack bootstrap for lont term cache
  optimization: {
    runtimeChunk: 'single',
  },

  plugins: [
    // HDD cache
    new HardSourceWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
  ],

  // No parse minimized modules, as they do not have any module importe statement.
  module: {
    noParse: [/\.min\.js/],
  },

});
