<template>
<div>
  <browser-dimensions></browser-dimensions>
  <div class="navbar">
    <div class="navbar-group">
      <a v-if="authUser" class="menu-button" @click="toggleSidebar"><fa-icon name="bars" :class="{ open: sidebarOpen }"></fa-icon></a>
      <nuxt-link class="brand" :to="authUser ? '/overview' : '/'">Ride&nbsp;log</nuxt-link>
    </div>
    <div class="navbar-group">
      <transition name="fade" mode="out-in">
        <context-menu v-if="authUser" key="userMenu">
          <v-gravatar slot="button" class="img-round" :email="authUser.email" :size="48"></v-gravatar>
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
  <div class="main-container">
    <side-bar></side-bar>
    <div class="backdrop"></div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</div>
</template>

<script>
  import gravatar from 'vue-gravatar';
  import BrowserDimensions from '@/components/BrowserDimensions';
  import ContextMenu from '@/components/ContextMenu';
  import SideBar from '@/components/SideBar';
  import 'vue-awesome/icons/bars';

  export default {
    meta: {
      public: true
    },
    head() {
      return {
        bodyAttrs: {
          class: this.$store.state.sidebar.open ? 'sidebar-open' : '',
          style: `padding-right: ${this.scrollbarWidth}px`
        }
      };
    },
    components: {
      BrowserDimensions,
      'v-gravatar': gravatar,
      ContextMenu,
      SideBar
    },
    data() {
      return {
        scrollbarWidth: 0
      };
    },
    computed: {
      sidebarOpen() {
        return this.$store.state.sidebar.open;
      },
      authUser() {
        return this.$store.state.authUser;
      }
    },
    methods: {
      toggleSidebar() {
        console.log(document.body.offsetWidth, document.body.clientWidth, window.innerWidth);
        this.scrollbarWidth = window.innerWidth - document.body.clientWidth;
        this.$store.commit(this.$store.state.sidebar.open ? 'CLOSE_SIDEBAR' : 'OPEN_SIDEBAR');
      }
    }
  };
</script>

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
  z-index: 40;

  .navbar-group {
      display: flex;
  }

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

.main-container {
  display: flex;
  min-height: calc(100vh - #{$navbar-height + 2 * $navbar-border});

  @media screen and (max-width: 1080px) {
    display: block;
  }

  .main-content {
    flex-grow: 1;
  }
}

.backdrop {
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  transition: opacity 1.5s;
  pointer-events: none;
  z-index: 25;
}

@media screen and (max-width: 1080px) {
  body.sidebar-open {
    overflow: hidden;

    .backdrop {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

.menu-button {
  svg {
    vertical-align: middle;
    margin-bottom: 10px;
    transform: rotate(0deg);
    transition: transform 0.5s;

    &.open {
      transform: rotate(90deg);
    }
  }
}

</style>
