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
  <section class="form-page">
    <form @submit.prevent="saveBike">
      <input type="hidden" name="id" id="id" v-model="id">
      <input type="hidden" name="user" id="user" v-model="user">
      <div>
        <select style="width: 80%" name="brand" id="brand" v-model="brand" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}</option>
        </select>
        <button @click.prevent="newBrand">+</button>
      </div>
      <input type="text" name="name" id="name" placeholder="Nom / modèle" v-model="name" @input="resetButton">
      <input type="date" name="buyDate" id="buyDate" placeholder="Date d'achat" v-model="buyDate" @input="resetButton">
      <input type="number" name="buyPrice" id="buyPrice" placeholder="Prix d'achat" v-model="buyPrice" @input="resetButton">
      <input type="date" name="sellDate" id="sellDate" placeholder="Date de vente" v-model="sellDate" @input="resetButton">
      <input type="number" name="sellPrice" id="sellPrice" placeholder="Prix de vente" v-model="sellPrice" @input="resetButton">
      <state-button
        :state="state"
        :label="id ? 'Mettre à jour' : 'Créer'"
        :successLabel="id ? 'Mise à jour effectuée' : 'Vélo créé'"
        :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
    </form>
  </section>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import StateButton, * as State from '@/components/StateButton';

export default {
  data() {
    return {
      state: State.READY
    };
  },
  computed: {
    ...mapFields([
      'editing.bike.id',
      'editing.bike.user',
      'editing.bike.brand',
      'editing.bike.name',
      'editing.bike.buyDate',
      'editing.bike.buyPrice',
      'editing.bike.sellDate',
      'editing.bike.sellPrice'
    ]),
    ...mapState([
      'bikes',
      'brands'
    ]),
  },
  methods: {
    editBike(bike) {
      this.resetButton();
      this.$store.commit('EDIT_BIKE', bike);
    },
    newBike() {
      this.resetButton();
      this.$store.commit('EDIT_BIKE');
    },
    async saveBike() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveBike');
        this.state = State.SUCCESS;
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    async deleteBike(bike) {
      this.$store.dispatch('deleteBike', bike);
    },
    resetButton() {
      this.state = State.READY;
    },
    newBrand() {
      console.log('blur');
    }
  },
  components: { StateButton }
};
</script>

<style lang="scss">
</style>
