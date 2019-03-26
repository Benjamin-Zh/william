module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage' }],
    // '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    '@babel/plugin-syntax-dynamic-import',
  ],
};
