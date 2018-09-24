
const fs = require('fs').promises;
const BLOG_ROOT = sails.config.custom.blogRoot;

module.exports = async function(req, res) {
  let files = await fs.readdir(BLOG_ROOT);
  let posts = [];
  for(file of files) {
    try {
      let content = await sails.helpers.readBlogPost(file);

      posts.push(content);
    }
    catch(err) {
      if(err.code === 'isDirectory') {
        // on ignore ce type d'erreur mais pourrait vouloir parcourir le dossier
      }
      else {
        console.log(err);
        throw err;
      }
    }
  }

  return res.send(posts);
};
