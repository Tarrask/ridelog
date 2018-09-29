<template>
<div>
  <browser-dimensions></browser-dimensions>
  <base-navbar></base-navbar>
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
  import BrowserDimensions from '@/components/BrowserDimensions';
  import BaseNavbar from '@/components/BaseNavbar';
  import SideBar from '@/components/SideBar';

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
      BaseNavbar,
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
      }
    }
  };
</script>

<style lang="scss">
@import '@/assets/styles/_variables.scss';

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
