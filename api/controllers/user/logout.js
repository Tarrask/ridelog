/**
 * Module dependencies
 */

/**
 * user/logout.js
 *
 * Logout user.
 */
module.exports = async function logout(req, res) {
  await req.session.destroy();
  return res.ok();
};
