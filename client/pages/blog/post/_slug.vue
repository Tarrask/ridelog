<template>
  <article class="white-page">
    <header>
      <div>{{ post.attributes.author }}</div>
      <div>il y a {{ modified }}</div>
    </header>
    <h2>{{ post.attributes.title }}</h2>
    <from-markdown :text="post.body"></from-markdown>
  </article>
</template>


<script>
import FromMarkdown from '@/components/FromMarkdown';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import frLocale from 'date-fns/locale/fr';

export default {
  meta: {
    public: true
  },
  async asyncData({ params, app, error }) {
    try {
      let post = await app.$axios.$get(`/api/blog/post/${params.slug}`);

      return {
        slug: params.slug,
        post: post
      };
    }
    catch(err) {
      error({statusCode: err.response.status, message: err.response.data.message || err.response.statusText});
    }
  },
  computed: {
    created() {
      return distanceInWordsToNow(this.post.attributes.created, { locale: frLocale });
    },
    modified() {
      return distanceInWordsToNow(this.post.attributes.modified, { locale: frLocale });
    }
  },
  components: { FromMarkdown }
};
</script>
