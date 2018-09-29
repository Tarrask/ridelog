module.exports = {

  friendlyName: 'Image',
  description: 'Image uploader.',
  files: ['file'],
  inputs: {
    file: {
      type: 'ref',
      required: true
    }
  },
  exits: {

  },
  fn: async function (inputs, exits) {
    inputs.file.upload({
      adapter: require('skipper-gridfs'),
      uri: `${sails.config.datastores.default.url}.images`
    }, (err, fileuploaded) => {
      if(err) {
        return exits.error(err);
      }
      return exits.success(fileuploaded);
    });

  }
};
