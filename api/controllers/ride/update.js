/**
 * Module dependencies
 */

const ObjectId = require('mongodb').ObjectID;

/**
 * ride/create.js
 *
 * Create a new ride tor the authenticated user
 */
module.exports = async function(req, res) {
  const id = req.params.id;
  if(!id) { return res.badRequest('id is missing'); }

  const currentRide = await Ride.findOne({ id });
  if(!currentRide) { return res.badRequest('Ride don\'t exits'); }

  if(currentRide.user !== req.session.userId) {
    return res.forbidden('You don\'t own this ride');
  }

  const newRide = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    reliveLink: req.body.reliveLink,
    youtubeLink: req.body.youtubeLink,
    odo: req.body.odo,
    gpxFile: new ObjectId(req.body.gpxFile)
  };
  console.log('updating ride:', newRide);
  await Ride.update({ id }, newRide);

  res.ok();
};
