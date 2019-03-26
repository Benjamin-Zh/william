const { loaders: JavaScriptLoaders } = require('./loadJavaScript');


module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          ...JavaScriptLoaders,
          'ts-loader',
        ],
      },
    ],
  },
});
