const { ENV, APP_MODE } = require('../../constants');


module.exports = {
  properties: {
    env: {
      type: 'string',
      enum: Object.values(ENV),
    },
    measure: {
      type: 'boolean',
    },
    appMode: {
      type: 'string',
      enum: Object.keys(APP_MODE),
    },
    pagesPath: {
      type: 'string',
    },
    cssModules: {
      type: 'boolean',
    },
    globalStylePath: {
      OneOf: [
        {
          type: 'string',
        },
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      ],
    },
  },
};
