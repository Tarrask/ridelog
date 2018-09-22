/**
 * Module dependencies
 */

const bcrypt = require('bcrypt');

/**
 * user/login.js
 *
 * Login user.
 */
module.exports = async function(req, res) {
  sails.log('login attempt...');

  // TODO: si un utilisateur est déjà connecté, on le déconnecte avant d'effectuer
  // une nouvelle tentative de connection

  let { username, password } = req.body;
  console.log('login for', username);

  const user = await User.findOne({ or: [{ username: username }, { email: username }] });
  sails.log('  User found:', user);
  
  if(user && user.passwordHash && await bcrypt.compare(password, user.passwordHash)) {
    sails.log('  Password is valid. Authentication successful');
    req.session.userId = user.id;
    return res.json({ data: user });
  }

  return res.forbidden({ errors: [{ title: 'Invalid username or password' }] });
};
