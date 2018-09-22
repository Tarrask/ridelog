<template>
<article class="white-page">
  <h1>Private area</h1>
  <nuxt-link to="/logout">logout</nuxt-link>
</article>
</template>

<script>
export default {
  async asyncData({ app }) {
    try {
      await app.$axios.get('/api/testAuth');
    }
    catch(err) {
      console.log('Error when fetching private data:', err);
    }
  }
};
</script>
