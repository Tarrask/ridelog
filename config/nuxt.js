const nodeExternals = require('webpack-node-externals');

module.exports.nuxt = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk} - Ridelog` : 'Ridelog';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'theme-color', content: '#37382a' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/styles/main.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e5e4ff' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      if(ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-awesome/]
          })
        ];
      }

      const vueLoader = config.module.rules.find(rule => rule.loader === `vue-loader`);
      vueLoader.options.preserveWhitespace = true;
    }
  },
  srcDir: 'client/',
  router: {
    middleware: [ 'session' ]
  },
  plugins: [ { src: '~plugins/socket.io.js', ssr: false }, '~plugins/font-awesome' ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  }
};
