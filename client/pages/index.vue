<template>
<div class="home" ref="home" :style="{ 'background-image': backgroundImage ? `url(${backgroundImage})` : false }">
  <div class="background-placeholder" :style="{'opacity': backgroundImage ? 0 : 1}"></div>
  <div class="content">
    <div class="login">
      <transition name="login-form" appear>
        <login-form v-show="loginVisible" class="login-form"></login-form>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import LoginForm from '@/components/LoginForm';

export default {
  head: {
    title: 'Home'
  },
  meta: {
    public: true
  },
  data() {
    return {
      backgroundImage: undefined,
      loginVisible: false
    };
  },
  computed: {
    imageVersion() {
      if(this.$store.state.window.orientation === 'l') {
        if(this.$store.state.window.x > 480) {
          return '';
        }
        else {
          return '_s';
        }
      }
      else {
        if(this.$store.state.window.x > 320) {
          return '_p';
        }
        else {
          return '_ps';
        }
      }
    }
  },
  watch: {
    imageVersion() {
      this.loadImage();
    }
  },
  mounted() {
    // charge l'image de fond
    this.loadImage();

    // affiche le Login
    this.loginVisible = true;
  },
  methods: {
    loadImage() {
      if(window) {
        let tempImg = new Image();
        tempImg.src = `/images/home${this.imageVersion}.jpg`;
        tempImg.onload = () => {
          console.log('img loaded', tempImg);
          this.backgroundImage = tempImg.src;
        };
      }
    }
  },
  components: { LoginForm }
};
</script>

<style lang="scss">
@import '@/assets/styles/_variables.scss';

.home {
  position: absolute;
  top: #{$navbar-height} + 2*#{$navbar-border};
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 30;
  min-height: calc(100vh - #{$navbar-height} - 2*#{$navbar-border});
  background: #787958;
  background-size: cover;
  background-position-x: 18%;
  background-position-y: 72%;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);

  .background-placeholder {
    background: #787958;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: opacity 1s;
    z-index: 10;
  }

  .content {
    position: relative;
    z-index: 20;
    overflow: hidden;

    .description {
      color: white;
      font-size: 5vw;
      text-shadow: 0 0 1vw #787958;
    }

    .login {
      margin: 10% auto 0;
      width: 100%;
      max-width: 576px;
      padding: 1em;
      box-sizing: border-box;
      text-align: right;

      .alert-error {
        border: 2px solid red;
        color: white;
        background: rgba(255, 0, 0, 0.5);
        text-align: left;
        padding: 0.5em;
        margin: 0 0 1em;
        font-size: 1.5em;
        border-radius: 5px;
      }


    }

    @media (min-width: 576px) {
      .login {
        // width: calc(576px);
      }
    }
    @media (min-width: 832px) {
      .login {
        margin: 10% 15% 0 auto;
      }
    }
  }
}
</style>
