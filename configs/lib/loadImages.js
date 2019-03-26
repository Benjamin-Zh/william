module.exports = ({ minimize = false, fileOptions = {}, minimizeOptions = {} } = {}) => {
  const loaders = [{
    loader: 'url-loader',
    options: {
      ...fileOptions,
      fallback: 'file-loader',
    },
  }];

  if (minimize) {
    loaders.push({
      loader: 'image-webpack-loader',
      options: minimizeOptions,
    });
  }

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
