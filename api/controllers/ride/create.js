/**
 * Module dependencies
 */

/**
 * ride/create.js
 *
 * Create a new ride tor the authenticated user
 */
module.exports = async function(req, res) {
  console.log('Saving files...');

  const files = await new Promise((resolve, reject) => {
    req.file('gpxFile').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://localhost:27017/ridelog.ride'
    }, (err, fileUploaded) => {
      if(err) { return reject(err); }
      resolve(fileUploaded);
    });
  });

  console.log(files);

  const ride = await Ride.create({
    user: req.session.userId,
    title: req.body.title,
    description: req.body.description,
    reliveLink: req.body.reliveLink,
    youtubeLink: req.body.youtubeLink,
    odo: req.body.odo,
    gpxFile: files[0] ? files[0].extra.fileId : null
  }).fetch();

  console.log('Files saved.', ride);

  res.json(ride);

  console.log('starting gpx processing...');
  await sails.helpers.gpxProcessor(ride.id);
};
