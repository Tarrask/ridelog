<template>
<div class="white-page">
  <h2>Ride log blog</h2>
  <ul>
    <li v-for="post in list" :key="post.path">
      <nuxt-link :to="`blog/post/${post.attributes.path}`">{{ post.attributes.title }}</nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  head: {
    title: 'Blog'
  },
  meta: {
    public: true
  },
  async asyncData({ app }) {
    return {
      list: await app.$axios.$get('/api/blog/list')
    };
  }
};
</script>
