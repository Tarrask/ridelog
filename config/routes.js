/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const onlyMine = require('../api/policies/onlyMine');

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'GET /api/user/whoami': { action: 'user/whoami', validation: { inputs: 'empty', exits: 'userOut' } },
  'POST /api/user/login': { action: 'user/login', validation: { inputs: 'loginForm', exits: 'userOut' } },
  'GET /api/user/logout': { action: 'user/logout', validation: { inputs: 'empty', exits: 'successOut' } },

  'GET /api/ride/process-gpx/:id': { action: 'ride/process-gpx' },
  'POST /api/ride': { action: 'ride/create', validation: { inputs: 'rideForm', exits: 'successOut' } },
  'GET /api/ride': { action: 'ride/find', parseBlueprintOptions: onlyMine },

  'GET /api/blog/list': { action: 'blog/list' },
  'GET /api/blog/post/:path': { action: 'blog/post', skipAssets: false },

  // prevent unmap responses to api to fall to Nuxt
  '/api/whoami': { response: 'notFound', skipAssets: false }

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
