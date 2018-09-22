<template>
<div class="white-page">
  <h2>Logging out ...</h2>
</div>
</template>

<script>
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  async mounted() {
    let startTime = Date.now();
    await this.$store.dispatch('logout');
    let stopTime = Date.now();
    let leftTime = Math.max(0, 2000 - stopTime + startTime);
    console.log(`${stopTime - startTime}ms to logout, waiting $${leftTime}ms before redirecting...`);
    await sleep(leftTime);

    this.$router.push('/');
  }
};
</script>
