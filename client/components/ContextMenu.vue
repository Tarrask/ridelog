<template>
<span>
  <button ref="button" @click.prevent="toggleMenu" :class="{ open: visible }"><slot name="button"></slot></button>
  <div ref="menu" class="menu" :class="{ open: visible }">
    <slot></slot>
  </div>
</span>
</template>

<style lang="scss" scoped>
.button {
}
.menu {
  background: gray;
  display: none;
  position: fixed;
  right: 0;
  min-width: 10em;


  font-size: 1.5em;

  box-shadow: 0 5px 20px rgba(0,0,0,0.5);

  &.open {
    display: block;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      line-height: 1.5em;
      padding: 0 0.5em;

      span {
        margin: 0.5em 0;
        color: #aaa;
      }

      a {
        width: 100%;
        font-size: 1em;
        line-height: inherit;
        border: none;
        margin: 0 -0.5em;
      }

      hr {
        margin: 0 -0.5em;
        border-width: 0;
        border-bottom: 1px solid #666;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    toggleMenu() {
      this.visible = !this.visible;

      if(this.visible) {
        // new Popper(this.$refs.button, this.$refs.menu, { placement: 'bottom-end' });
      }
    }
  },
  mounted() {
    window.addEventListener('click', e => {
      if(e.target === this.$refs.button) {
        return;
      }
      if(this.visible) {
        this.toggleMenu();
      }
    }, true);
  }
};
</script>
