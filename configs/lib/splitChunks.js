module.exports = ({ enabled = false } = {}) => (
  enabled
    ? {
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
    }
    : {
      optimization: {
        splitChunks: false,
      },
    }
);
