<template lang="html">
  <div>
    <section class="white-page">
      <h2>Liste des marques</h2>
      <ul>
        <li v-for="brand in brands" :key="brand.id">
          <a :href="brand.website" target="_blank">{{ brand.name }}</a>
          <button @click="editBrand(brand)">Editer</button>
          <button @click="deleteBrand(brand)">Supprimer</button>
        </li>
        <li>Ajouter une marque <button @click="newBrand()">Nouveau</button></li>
      </ul>
    </section>
    <section class="form-page">
      <form @submit.prevent="saveBrand">
        <input type="hidden" name="id" id="id" v-model="id">
        <input type="text" name="name" id="name" placeholder="Nom" v-model="name" @input="resetButton">
        <input type="text" name="website" id="website" placeholder="Website" v-model="website" @input="resetButton">
        <state-button
          :state="state"
          :label="id ? 'Mettre à jour' : 'Créer'"
          :successLabel="id ? 'Mise à jour effectuée' : 'Marque créée'"
          :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </form>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import StateButton, * as State from '@/components/StateButton';

function initialBrand() {
  return {
    id: null,
    name: '',
    website: ''
  };
}

export default {
  data() {
    return {
      state: State.READY
    };
  },
  computed: {
    ...mapFields([
      'editing.brand.id',
      'editing.brand.name',
      'editing.brand.website'
    ]),
    ...mapState({
      brands: state => state.model.brand
    })
  },
  methods: {
    editBrand(brand) {
      this.resetButton();
      this.$store.commit('EDIT_RECORD', { type: 'brand', record: brand });
    },
    newBrand() {
      this.resetButton();
      this.$store.commit('NEW_RECORD', { type: 'brand' });
    },
    async saveBrand() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'brand');
        this.state = State.SUCCESS;
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    async deleteBrand(brand) {
      await this.$store.dispatch('deleteRecord', { type: 'brand', record: brand });
    },
    resetButton() {
      this.state = State.READY;
    }
  },
  components: { StateButton }
};
</script>

<style lang="css">
</style>
