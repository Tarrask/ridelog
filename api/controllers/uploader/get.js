const  mongodb  = require('mongodb');

module.exports = {
  friendlyName: 'Get',
  description: 'Get uploader.',
  inputs: {
    fd: {
      type: 'string'
    }
  },
  exits: {
    notFound: {
      responseType: 'notFound',
      description: 'The requested image can not be found.'
    }
  },
  fn: async function (inputs, exits) {
    let fd = inputs.fd;

    const db = (await sails.getDatastore('default')).manager;
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'images'
    });

    let records = await bucket.find({ metadata: { fd, dirname: '.' }}).toArray();
    if(records.length < 1) {
      return exits.notFound();
    }
    return exits.success(bucket.openDownloadStream(records[0]._id));
  }
};
