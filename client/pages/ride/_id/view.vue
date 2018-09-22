<template>
<div class="white-page">
  <h2>View ride</h2>
  <p>{{ ride.title }}</p>
  <from-markdown :text="ride.description"></from-markdown>
  <p>{{ ride.date }}</p>
  <p>{{ ride.odo }}</p>
  <relive-embedly :link="ride.reliveLink"></relive-embedly>
</div>
</template>

<script>
import FromMarkdown from '@/components/FromMarkdown';
import ReliveEmbedly from '@/components/ReliveEmbedly';

export default {
  async fetch({ store, params }) {
    await store.dispatch('getRide', params.id);
  },
  computed: {
    ride() {
      return this.$store.getters.ridesById[this.$route.params.id];
    }
  },
  components: { FromMarkdown, ReliveEmbedly }
};
</script>
