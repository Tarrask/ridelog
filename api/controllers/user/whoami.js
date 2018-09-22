/**
 * Module dependencies
 */

/**
 * user/whoami.js
 *
 * Tell the client who he is, based on cookies and session
 */
 module.exports = async function(req, res) {
  if(!req.session || !req.session.userId) {
    return res.status(401).json({ data: null });
  }

  const user = await User.findOne(req.session.userId);
  return res.json({ data: user });
};
