<template lang="html">
  <div class="white-page">
    <nuxt-link to="/ride/new" class="btn float"><fa-icon name="regular/calendar-plus"></fa-icon>Nouvelle sortie</nuxt-link>
    <h2>Mes sorties</h2>
    <ul>
      <li v-for="ride in rides" :key="ride.id">{{ ride.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import 'vue-awesome/icons/regular/calendar-plus';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState([ 'rides' ])
  }
};
</script>

<style lang="scss" scoped>
.float {
  float: right;
  width: auto;
  font-size: 1rem;
}
h2 {
  margin-top: 0;
}
</style>
