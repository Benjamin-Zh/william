module.exports = ({ fileOptions = {} } = {}) => {
  const loaders = [{
    loader: 'url-loader',
    options: {
      ...fileOptions,
      fallback: 'file-loader',
    },
  }];

  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|webp|png|gif|svg)$/,
          use: loaders,
        },
      ],
    },
  };
};
