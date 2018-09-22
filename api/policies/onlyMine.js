
module.exports = function(req) {
  var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);
  queryOptions.criteria.where.user = req.session.userId;
  delete queryOptions.populates.user;
  return queryOptions;
};
