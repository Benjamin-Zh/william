module.exports = {
  extends: ['airbnb-base'],
  env: {
    node: true,
  },

  // 解析 webpack alias 配置
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: './webpack.config.js'
  //     },
  //   },
  // },

  rules: {

    // 允许 devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      { "devDependencies": true }
    ],

  },
};
