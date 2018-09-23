
const { Nuxt, Builder } = require('nuxt');

module.exports = {
  friendlyName: 'Build',
  description: 'Build nuxt for production.',
  inputs: {
    analyze: {
      description: 'Run webpack analyse at the same time',
      type: 'boolean',
      defaultsTo: false
    }
  },
  fn: async function (inputs, exits) {
    sails.log('Build nuxt for production...');

    let options = sails.nuxt.options;

    if(inputs.analyze && typeof options.build.analyze !== 'object') {
      options.build.analyze = true;
    }

    await new Builder(sails.nuxt).build();

    // All done.
    if(options.build.analyze === true || typeof options.build.analyze === 'object') {
      return;
    }
    return exits.success();
  }
};
