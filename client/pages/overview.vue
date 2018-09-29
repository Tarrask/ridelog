<template>
<div>
    <div class="white-page">
      <action-bar></action-bar>
      <table>
        <tbody>
          <tr v-for="ride in rides" :key="ride.id">
            <td><nuxt-link :to="`/ride/${ride.id}/view`">{{ ride.title }}</nuxt-link></td>
            <td><nuxt-link :to="`/ride/${ride.id}/edit`">Edit</nuxt-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ActionBar from '@/components/ActionBar';

export default {
  async fetch({ store, params }) {
    await store.dispatch('getRides');
  },
  transition(to, from) {
    console.log('transition overview from:', from);
    return from.name === 'index' ? { name: 'login', mode: 'in-out' } : 'page';
  },
  computed: {
    ...mapState({
      rides: state => state.rides
    })
  },
  components: { ActionBar }
};
</script>
