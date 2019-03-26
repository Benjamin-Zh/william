module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:5].[ext]',
          },
        },
      },
    ],
  },
});
