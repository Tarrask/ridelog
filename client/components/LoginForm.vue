<template>
  <form method="POST" action="/api/login" @submit.prevent="login">
    <div class="alert-error" v-if="error">Invalid username or password</div>
    <input type="text" v-model="username" name="username" placeholder="Your name or email address" @input="resetButton">
    <input type="password" v-model="password" name="password" placeholder="Your secret password" @input="resetButton">
    <state-button :state="state" :disabled="!(username && password)" label="Connection" errorLabel="Echec de la connection"></state-button>
  </form>
</template>

<script>
import StateButton, * as State from '@/components/StateButton';

export default {
  components: { StateButton },
  data() {
    return {
      username: undefined,
      password: undefined,
      error: undefined,
      state: State.READY
    };
  },
  methods: {
    async login() {
      try {
        this.error = undefined;
        this.state = State.PENDING;
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        this.state = State.SUCCESS;
        this.$router.push(`/overview`);
      }
      catch(err) {
        this.username = undefined;
        this.password = undefined;
        this.error = err;
        this.$nextTick(() => { this.state = State.ERROR; });

        console.log('Error when logging in:', err);
      }
    },
    resetButton() {
      this.state = State.READY;
    }
  }
};
</script>
