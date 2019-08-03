<template lang="html">
  <div class="sidebar" :class="{ open }">
    <div class="sidebar-content">
      <div class="user" v-if="authUser">
        <v-gravatar class="avatar img-round" :email="authUser.email" :size="120"></v-gravatar>
        <h3>{{ authUser.username }}</h3>
      </div>
      <hr>
      <ul class="menu">
        <li><nuxt-link to="/overview" @click.native="closeSideBar"><fa-icon name="home"></fa-icon> Vue d'ensemble</nuxt-link></li>
        <li><nuxt-link to="/bike" @click.native="closeSideBar"><fa-icon name="bicycle"></fa-icon> Mes vélos</nuxt-link></li>
        <li><nuxt-link to="/ride" @click.native="closeSideBar"><fa-icon name="map"></fa-icon> Mes sorties</nuxt-link></li>
        <li><nuxt-link to="/servicing" @click.native="closeSideBar"><fa-icon name="oil-can"></fa-icon> Mes maintenances</nuxt-link></li>
        <li><nuxt-link to="/test" @click.native="closeSideBar"><fa-icon name="vial"></fa-icon> Test</nuxt-link></li>
        <li><nuxt-link to="/test" @click.native="closeSideBar"><fa-icon name="vial"></fa-icon> Test</nuxt-link></li>
        <li><nuxt-link to="/test" @click.native="closeSideBar"><fa-icon name="vial"></fa-icon> Test</nuxt-link></li>
        <li><nuxt-link to="/test" @click.native="closeSideBar"><fa-icon name="vial"></fa-icon> Test</nuxt-link></li>
      </ul>
      <hr>
      <ul class="footer">
        <li>
          <nuxt-link to="/logout" class="logout">Logout <fa-icon name="sign-out-alt"></fa-icon></nuxt-link>
          <nuxt-link to="/settings" class="settings"><fa-icon name="wrench"></fa-icon></nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gravatar from 'vue-gravatar';
import 'vue-awesome/icons/home';
import 'vue-awesome/icons/bicycle';
import 'vue-awesome/icons/map';
import 'vue-awesome/icons/sign-out-alt';
import 'vue-awesome/icons/wrench';
import 'vue-awesome/icons/vial';
import 'vue-awesome/icons/oil-can';

export default {
  components: { 'v-gravatar': gravatar },
  computed: {
    open() { return this.$store.state.sidebar.open; },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  methods: {
    closeSideBar() {
        console.log('should i close sidebar', this.$store.state.window.x);
        if(this.$store.state.window.x < 1080) {
          this.$store.commit('CLOSE_SIDEBAR');
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.sidebar {
  left: 0;
  top: $navbar-height + 2 * $navbar-border;
  bottom: 0;
  width: 0;
  background: #e4e4de;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  z-index: 30;
  overflow: hidden;
  transition: width 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .sidebar-content {
    width: 275px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .menu {
      flex-grow: 1;
      overflow-y: auto;
    }

    ul.footer {
      li {
        display: flex;
      }
      a.logout {
        flex-grow: 1;
        text-align: center;
        color: #d55300;
        border-right: 1px solid rgba(0,0,0,0.1);
        font-weight: bold;
        .fa-icon {
          color: #d55300;
          margin: 0;
        }
      }
      a.settings {
        padding: 0.7em 0.9em;
        text-align: center;
        .fa-icon {
          margin: 0;
        }
      }
    }
  }

  .avatar {
    margin-top: 1.5rem;
    box-shadow: 2px 2px 20px rgba(120, 121, 88, 0.3);
  }

  h3 {
    margin: 1.5rem 0;
  }

  hr {
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    width: 100%;
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 100%;

    a {
      display: block;
      padding: 0.7em 1.5em;
      text-decoration: none;
      color: black;
      background: rgba(0,0,0,0);
      transition: background 0.3s;

      &:hover {
        background: rgba(0,0,0,0.03);
      }

      &.nuxt-link-active {
        border-right: 3px solid #00a1ff;
        background: rgba(255,255,255,0.4);
        cursor: default;
      }

      .fa-icon {
        color: #4C4D38;
      }
    }
  }

  @media screen and (max-width: 1080px) {
    position: fixed;
  }

  &.open {
    width: $sidebar-width;
  }
}
</style>
