const Boom = require('boom');

module.exports = async function() {
  let boom = Boom.notFound(...arguments).output;
  if(this.req.wantsJSON) {
    return this.res.status(boom.statusCode).send(boom.payload);
  }
  else {
    this.req.error = boom.payload;
    let page = await sails.nuxt.renderRoute('/error', { req: this.req, res: this.res });
    return this.res.status(boom.statusCode).send(page.html);
  }
};
