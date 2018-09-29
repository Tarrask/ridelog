
module.exports = function(req, res, next) {
  if(!req.session || !req.session.userId) {
    return res.forbidden();
  }
  next();
};
