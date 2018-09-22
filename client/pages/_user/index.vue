<template>
  <div class="white-page">
    <h1>Welcome {{ username }}</h1>
    <nuxt-link to="new-ride" append>Nouveau ride</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.authUser.username;
    }
  }
};
</script>
