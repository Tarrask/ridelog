<template>
  <form method="POST" action="/api/login" @submit.prevent="login">
    <div class="alert-error" v-if="error">Invalid username or password</div>
    <input type="text" v-model="username" name="username" placeholder="Your name or email address">
    <input type="password" v-model="password" name="password" placeholder="Your secret password">
    <input type="submit" :disabled="!(username && password)" value="login">
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
      error: undefined
    };
  },
  methods: {
    async login() {
      try {
        this.error = undefined;
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        this.$router.push(`/overview`);
      }
      catch(err) {
        this.error = err;
        this.username = undefined;
        this.password = undefined;
        console.log('Error when logging in:', err);
      }
    }
  }
};
</script>
