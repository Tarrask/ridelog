<template>
<div :class="{ hidden: !reliveLoaded}">
<blockquote ref="card" data-card-controls="0" data-card-chrome="0" data-card-theme="light" data-card-align="left" data-card-width="100%" data-card-key="f1631a41cb254ca5b035dc5747a5bd75"  >
  <h4><a :href="`${link}?r=embed-site`">Relive video</a></h4>
  <p>Une description</p>
</blockquote>
</div>
</template>

<style lang="scss">
.hidden {
  display: none;
}
</style>

<script>
export default {
  props: ['link'],
  data() {
    return {
      reliveLoaded: false
    };
  },
  mounted() {
    if(process.browser) {
      if(!window.embedly) {
        let reliveScript = document.createElement('script');
        reliveScript.setAttribute('src', '//cdn.embedly.com/widgets/platform.js');
        reliveScript.setAttribute('charset', 'UTF-8');
        reliveScript.setAttribute('id', 'relive-script');
        reliveScript.async = true;
        reliveScript.addEventListener('load', () => {
          console.log(window && window.embedly);
          window.embedly('card', this.$refs.card);
          window.embedly('on', 'card.rendered', () => {
            this.reliveLoaded = true;
          });
        });
        document.body.appendChild(reliveScript);
      }
      else {
        console.log(window && window.embedly);
        window.embedly('card', this.$refs.card);
        window.embedly('on', 'card.rendered', () => {
          this.reliveLoaded = true;
        });
      }
    }
  }
};
</script>
