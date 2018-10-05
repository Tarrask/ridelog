<template lang="html">
  <div class="white-page">
    {{ bike.name }}
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    bike() {
      return this.$store.getters.bike(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
</style>
