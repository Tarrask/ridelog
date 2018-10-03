<template>
<div class="form-page">
  <h2>Nouveau ride</h2>
  <form method="POST" action="/api/ride" @submit.prevent="postRide">
    <input v-model="ride.title" type="text" placeholder="title" />
    <textarea v-model="ride.description" placeholder="description" />
    <div>
      <select style="width: 80%" name="bike" id="bike" v-model="bike" @change="resetButton">
        <option :value="undefined">&mdash; Faites un choix &mdash;</option>
        <option v-for="bike in bikes" :value="bike.id" :key="bike.id">{{ bike.name }}</option>
      </select>
      <button @click.prevent="newBike">+</button>
    </div>
    <input v-model="ride.date" type="date" placeholder="Date" />
    <input v-model="ride.reliveLink" type="text" placeholder="relive link" />
    <input v-model="ride.youtubeLink" type="text" placeholder="Youtube vidéo" />
    <input v-model="ride.odo" type="text" placeholder="km à la fin" />
    <input type="file" id="gpxFile" ref="gpxFile" @change="handleFileUpload()">
    <input type="submit" value="Créer" />
  </form>
</div>
</template>

<style scoped lang="scss">
h2 {
  color: white;
  font-size: 2em;
}
</style>

<script>
import { mapState } from 'vuex';
import FileUploader from '~/components/FileUpload';

export default {
  data() {
    return {
      ride: {
        title: undefined,
        description: undefined,
        bike: undefined,
        date: new Date(),
        reliveLink: undefined,
        youtubeLink: undefined,
        odo: undefined,
        gpxFile: undefined
      }
    };
  },
  computed: {
    ...mapState([ 'bikes' ])
  },
  methods: {
    postRide() {
      console.log('creating ride:', this.ride);
      this.$store.dispatch('createRide', this.ride);
    },
    handleFileUpload() {
      console.log('uploading file:', this.$refs.gpxFile);
      this.ride.gpxFile = this.$refs.gpxFile.files[0];
    }
  },
  components: {
    FileUploader
  }
};
</script>
