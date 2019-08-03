<template lang="html">
  <div class="form-page">
    <form @submit.prevent="saveRide">
      <input type="hidden" name="id" id="id" v-model="id">
      <input type="hidden" name="user" id="user" v-model="user">
      <input type="text" name="name" id="name" placeholder="Titre" v-model="name" @input="resetButton">
      <textarea placeholder="Description"></textarea>
      <file-uploader @uploaded-files="updateFilesList" :initial-files="pictures"></file-uploader>
      <div class="combo">
        <select name="bike" id="bike" v-model="bike" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <option v-for="bike in bikes" :value="bike.id" :key="bike.id">{{ bike.name }}</option>
        </select>
        <button class="btn" @click.prevent="newBike">+</button>
      </div>
      <input type="number" name="odo" id="odo" placeholder="Kilometrage en fin de sortie" v-model="odo" @input="resetButton">
      <input type="date" name="date" id="date" placeholder="Date de la sortie" v-model="date" @input="resetButton">
      <input type="url" name="reliveLink" id="reliveLink" placeholder="lien Relive" v-model="reliveLink" @input="resetButton">
      <input type="url" name="youtubeLink" id="youtubeLink" placeholder="lien youtube" v-model="youtubeLink" @input="resetButton">
      <div class="btn-row">
        <button @click.prevent="$router.go(-1)" class="btn btn-cancel">Annuler</button>
        <state-button
          :state="state"
          :label="id ? 'Mettre à jour' : 'Créer'"
          :successLabel="id ? 'Mise à jour effectuée' : 'Sortie créée'"
          :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </div>
    </form>
  </div>
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
      state: State.READY
    };
  },
  computed: {
    ...mapFields([
      'editing.ride.id',
      'editing.ride.user',
      'editing.ride.name',
      'editing.ride.pictures',
      'editing.ride.bike',
      'editing.ride.description',
      'editing.ride.reliveLink',
      'editing.ride.youtubeLink',
      'editing.ride.odo',
      'editing.ride.date',
      'editing.ride.gpxFile'
    ]),
    ...mapState({
      bikes: state => state.model.bike
    }),
  },
  methods: {
    async saveRide() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'ride');
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
    updateFilesList(files) {
      this.pictures = files.map(f => f.name);
    },
    newBike() {
      this.$store.commit('NEW_RECORD', { type: 'bike' });
      this.$router.push('/bike/edit');
    }
  }
};
</script>

<style lang="scss">
</style>
