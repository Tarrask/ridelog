<template>
  <section class="error-page">
    <!-- <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" /> -->
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <div class="message">
      <nuxt-link to="/">Homepage</nuxt-link>
    </div>
  </section>
</template>

<style lang="scss">
.error-page {
  margin: 2em auto;
  max-width: 30em;
  text-align: center;
  padding-top: 2em;

  .title {
    font-size: 5em;
    color: white;
    text-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
  .info {
    font-weight: 300;
    color: white;
    text-shadow: 0 0 5px rgba(0,0,0,0.8);
    margin: 0;
  }
  .message {
    margin-top: 50px;
  }
  .button {
    margin-top: 50px;
  }
}
</style>

<script>
export default {
  props: ['error']
};
</script>
