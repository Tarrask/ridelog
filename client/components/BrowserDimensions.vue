
<script>
import throttle from 'lodash/throttle';

export default {
  render() {
    return null; //this.$scopedSlots.default({});
  },
  mounted() {
    console.log('component mounted2');
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  },
  beforeDestroy() {
    console.log('component dismounted');
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    onWindowResize: throttle(function() {
      this.$store.commit('SET_WINDOW_DIMENSIONS', {
        x: window.innerWidth,
        y: window.innerHeight,
        orientation: window.innerWidth/window.innerHeight > 1 ? 'l' : 'p'
      });
      console.log('dimension changed3');
    }, 200)
  }
};
</script>

<style lang="css">
</style>
