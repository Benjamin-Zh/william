const webpack = require('webpack');


module.exports = () => ({
  devServer: {
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
