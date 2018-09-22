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
      <form @submit.prevent="updateBrand">
        <input type="hidden" name="id" id="id" v-model="brand._id">
        <input type="text" name="name" id="name" placeholder="Nom" v-model="brand.name" @input="resetButton">
        <input type="text" name="website" id="website" placeholder="Website" v-model="brand.website" @input="resetButton">
        <state-button
          :state="state"
          :label="brand.id ? 'Mettre à jour' : 'Créer'"
          :successLabel="brand.id ? 'Mise à jour effectuée' : 'Marque créée'"
          :errorLabel="brand.id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </form>
    </section>
  </div>
</template>

<script>
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
      brand: initialBrand(),
      state: State.READY
    };
  },
  computed: {
    brands() {
      return this.$store.state.brands;
    }
  },
  methods: {
    editBrand(brand) {
      this.resetButton();
      this.brand = Object.assign({}, brand);
    },
    newBrand() {
      this.resetButton();
      this.resetBrand();
    },
    async updateBrand() {
      try {
        this.state = State.PENDING;
        let brand = this.brand.id
          ? await this.$axios.$patch(`/api/brand/${this.brand.id}`, this.brand)
          : await this.$axios.$post('/api/brand', { name: this.brand.name, website: this.brand.website });
        this.$store.commit(this.brand.id ? 'UPDATE_BRAND' : 'ADD_BRAND', brand);
        this.state = State.SUCCESS;
      }
      catch(err) {
        this.state = State.ERROR;
      }
    },
    async deleteBrand(brand) {
      await this.$axios.$delete(`/api/brand/${brand.id}`);
      this.$store.commit('DELETE_BRAND', brand);
    },
    resetBrand() {
      this.brand = initialBrand();
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
