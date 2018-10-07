
const mongodb = require('mongodb');

async function some(array, predicate) {
  for(item of array) {
    if(await predicate(item)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  friendlyName: 'Useless',
  description: 'Useless uploader.',
  inputs: { },
  exits: { },
  fn: async function (inputs, exits) {
    const db = (await sails.getDatastore('default')).manager;

    let docs = await db.collection('images.files').find();
    let uselessDocs = [];

    while(await docs.hasNext()) {
      let doc = await docs.next();

      console.log('Looking for owner of:', doc.metadata.fd);
      if(! await some(['bike', 'ride'], async col => {
        let owner = await db.collection(col).findOne({ 'pictures': { $eq: doc.metadata.fd }});
        console.log('   ', col, '-->', owner);
        return owner !== null;
      })) {
        console.log('    no owner found for doc');
        uselessDocs.push(doc);
      }
      else {
        console.log('    found');
      }
    }

    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'images'
    });
    for(image of uselessDocs) {
      await bucket.delete(image._id);
    }

    return exits.success(uselessDocs);
  }
};
