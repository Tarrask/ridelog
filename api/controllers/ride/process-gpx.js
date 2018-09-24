module.exports = async function(req, res) {
  const id = req.params.id;
  if(!id) { return res.badRequest('Id is missing'); }

  const path = await sails.helpers.gpxProcessor(id);

  return res.json(path);
};
