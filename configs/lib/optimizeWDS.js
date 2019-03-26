module.exports = ({ isSp } = {}) => ({
  devServer: {
    overlay: true,
    progress: true,
    historyApiFallback: isSp,
  },
});
