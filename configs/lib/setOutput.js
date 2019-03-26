const { DIST_PATH } = require('../../constants/paths');


module.exports = () => ({
  output: {
    path: DIST_PATH,
    filename: '[name].[contenthash:5].js',
    chunkFilename: '[name].[contenthash:5].js',
  },
});
