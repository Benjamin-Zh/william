const loaders = [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
];

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: loaders,
      },
    ],
  },
});

module.exports.loaders = loaders;
