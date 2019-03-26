const loadJavaScript = require('./loadJavaScript');


module.exports = ({ name } = {}) => ({
  output: {
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: { name },
          },
          ...loadJavaScript.loaders,
        ],
      },
    ],
  },
});
