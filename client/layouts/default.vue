<template>
<div>
  <div class="navbar">
    <nuxt-link class="brand" :to="authUser ? '/overview' : '/'">Ride&nbsp;log</nuxt-link>
    <div>
      <transition name="fade" mode="out-in">
        <context-menu v-if="authUser" key="userMenu">
          <v-gravatar slot="button" :email="authUser.email" :size="48"></v-gravatar>
          <ul>
            <li><span>{{ authUser.username }}</span></li>
            <li><hr></li>
            <!-- <li><nuxt-link to="/">A somewhat very long item</nuxt-link></li> -->
            <li><nuxt-link to="/logout">Logout</nuxt-link></li>
          </ul>
        </context-menu>
        <span v-else key="register">
          <nuxt-link to="/register" >Register</nuxt-link>
        </span>
      </transition>
      <nuxt-link to="/blog">Blog</nuxt-link>
    </div>
  </div>
    <nuxt />
</div>
</template>

<style lang="scss">
@import '@/assets/styles/_variables.scss';

.navbar {
  position: sticky;
  top: 0;
  background-color: $navbar-bg;
  color: $navbar-color;
  display: flex;
  justify-content: space-between;
  //align-items: baseline;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  z-index: 30;

  a, button {
    color: $navbar-color;
    background: transparent;
    text-decoration: none;
    line-height: $navbar-height;
    font-size: 2em;
    font-weight: 300;
    padding: 0 0.5em;
    transition: background-color 0.2s, border-color 1s ease-out;
    border-width: 3px 0;
    border-style: solid;
    border-color: transparent;
    outline: none;
    display: inline-block;

    &.nuxt-link-exact-active {
      border-bottom-color: white;
    }

    &:hover, &:focus, &.open {
      background-color: rgba(255, 255, 255, 0.2);
    }

    img {
      vertical-align: middle;
    }
  }

  .brand {
    font-weight: bold;
  }
}
</style>

<script>
  import gravatar from 'vue-gravatar';
  import ContextMenu from '@/components/ContextMenu';

  export default {
    meta: {
      public: true
    },
    computed: {
      authUser() {
        return this.$store.state.authUser;
      }
    },
    components: {
      'v-gravatar': gravatar,
      ContextMenu
    }
  };
</script>
