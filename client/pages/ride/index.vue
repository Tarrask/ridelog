<template lang="html">
  <div class="card-page">
    <base-card
        v-for="ride in rides"
        :key="ride.id"
        :image="ride.pictures ? ride.pictures[0] : undefined"
        @click.native="editRide(ride)"
        @edit-card="editRide(ride)">
      {{ ride.name }}
    </base-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import 'vue-awesome/icons/regular/calendar-plus';

import BaseCard from '@/components/BaseCard';

export default {
  components: { BaseCard },
  data() {
    return {};
  },
  computed: {
    ...mapState({ rides: state => state.model.ride })
  },
  methods: {
    editRide(ride) {
      this.$store.commit('EDIT_RECORD', { type: 'ride', record: ride });
      this.$router.push('/ride/edit');
    }
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
