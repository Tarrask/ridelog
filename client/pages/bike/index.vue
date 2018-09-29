<template lang="html">
<div>
  <section class="white-page">
    <h2>Liste des vélos</h2>
    <ul>
      <li v-for="bike in bikes" :key="bike.id">
        {{ bike.name }}
        <button @click="editBike(bike)">Editer</button>
        <button @click="deleteBike(bike)">Supprimer</button>
      </li>
      <li>Ajouter un vélo <button @click="newBike()">Nouveau</button></li>
    </ul>
  </section>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['bikes']),
  },
  methods: {
    editBike(bike) {
      this.$store.commit('EDIT_BIKE', bike);
      this.$router.push('/bike/edit');
    },
    newBike() {
      this.$store.commit('EDIT_BIKE');
      this.$router.push('/bike/edit');
    },
    async deleteBike(bike) {
      this.$store.dispatch('deleteBike', bike);
    }
  }
};
</script>

<style lang="scss">
</style>
