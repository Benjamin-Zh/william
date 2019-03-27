module.exports = {
  extends: ['airbnb-base'],
  env: {
    node: true,
  },

  rules: {

    // 允许 devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      { "devDependencies": true }
    ],

  },
};
