/* module.exports = async function(req, res) {
  try {
    let content = await sails.helpers.readBlogPost(req.param('path'));
    res.send(content);
  }
  catch(err) {
    console.log(err);
    if(err.code === 'notFound' || err.code === 'isDirectory') {
      return res.notFound(`Blog post '${req.param('path')}' can not be found`);
    }
    return res.serverError(err);
  }
};
*/

module.exports = {


  friendlyName: 'get blog post',


  description: 'return the requested blog post data',


  inputs: {
    path: {
      friendlyName: 'Chemin d\'accès',
      description: 'Les chemin d\'accès au fichier contenant le post, relatif à la racine du blog',
      type: 'string'
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'Le contenu du post ainsi que les metadonnées associées'
    },
    notFound: {
      responseType: 'notFound',
      description: 'The requested blog post does not exist or it is a directory'
    }
  },


  fn: async function (inputs, exits) {
    try {
      let content = await sails.helpers.readBlogPost(inputs.path);
      return exits.success(content);
    }
    catch(err) {
      if(err.code === 'notFound' || err.code === 'isDirectory') {
        return exits.notFound(`The Blog post '${inputs.path}' does not exist yet`);
      }
      else {
        return exits.error(err);
      }
    }
  }
};
