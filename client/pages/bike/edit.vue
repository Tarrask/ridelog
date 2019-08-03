<template lang="html">
  <section class="form-page">
    <form @submit.prevent="saveBike">
      <input type="hidden" name="id" id="id" v-model="id">
      <input type="hidden" name="user" id="user" v-model="user">
      <div class="combo">
        <select name="brand" id="brand" v-model="brand" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}</option>
        </select>
        <button class="btn" @click.prevent="newBrand">+</button>
      </div>
      <input type="text" name="name" id="name" placeholder="Nom / modèle" v-model="name" @input="resetButton">
      <!-- <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone> -->
      <file-uploader @uploaded-files="updateFilesList" :initial-files="pictures"></file-uploader>
      <input type="date" name="buyDate" id="buyDate" placeholder="Date d'achat" v-model="buyDate" @input="resetButton">
      <input type="number" name="buyPrice" id="buyPrice" placeholder="Prix d'achat" v-model="buyPrice" @input="resetButton">
      <input type="date" name="sellDate" id="sellDate" placeholder="Date de vente" v-model="sellDate" @input="resetButton">
      <input type="number" name="sellPrice" id="sellPrice" placeholder="Prix de vente" v-model="sellPrice" @input="resetButton">
      <div class="btn-row">
        <button @click.prevent="$router.go(-1)" class="btn btn-cancel">Annuler</button>
        <state-button
          :state="state"
          :label="id ? 'Mettre à jour' : 'Créer'"
          :successLabel="id ? 'Mise à jour effectuée' : 'Vélo créé'"
          :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import StateButton, * as State from '@/components/StateButton';
import FileUploader from '@/components/FileUploader';

export default {
  components: { StateButton, FileUploader },
  data() {
    return {
      state: State.READY,
      options: {
        url: "/api/uploader/image"
      }
    };
  },
  computed: {
    ...mapFields([
      'editing.bike.id',
      'editing.bike.user',
      'editing.bike.brand',
      'editing.bike.name',
      'editing.bike.pictures',
      'editing.bike.buyDate',
      'editing.bike.buyPrice',
      'editing.bike.sellDate',
      'editing.bike.sellPrice'
    ]),
    ...mapState({ brands: state => state.model.brand })
  },
  methods: {
    async saveBike() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'bike');
        this.state = State.SUCCESS;
        setTimeout(() => {
          this.$router.go(-1);
        }, 500);
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    resetButton() {
      this.state = State.READY;
    },
    newBrand() {
      this.$router.push('/brand');
    },
    updateFilesList(files) {
      this.pictures = files.map(f => f.name);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
