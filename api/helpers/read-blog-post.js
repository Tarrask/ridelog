
const fs = require('fs').promises;
const fm = require('front-matter');
const path = require('path');

const BLOG_ROOT = sails.config.custom.blogRoot;

module.exports = {


  friendlyName: 'Read blog post',


  description: 'Lit un post du blog depuis le système de fichier',


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
      responseType: 'notFound'
    },
    isDirectory: {}
  },


  fn: async function (inputs, exits) {
    try {
      let handle = await fs.open(path.join(BLOG_ROOT, inputs.path), 'r');
      let stats = await handle.stat();
      let content = fm(await handle.readFile({ encoding: 'utf8' }));
      handle.close();

      content.attributes.path = inputs.path;
      content.attributes.created = stats.ctimeMs;
      content.attributes.modified = stats.mtimeMs;

      return exits.success(content);
    }
    catch(err) {
      if(err.code === 'ENOENT') {
        throw 'notFound';
      }
      if(err.code === 'EISDIR') {
        throw 'isDirectory';
      }
      throw err;
    }
  }
};
