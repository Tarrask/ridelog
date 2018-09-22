<template>
<div class="form-page">
  <h2>Edit ride</h2>
  <form method="POST" action="/api/ride" @submit.prevent="saveRide">
    <input v-model="ride.title" type="text" placeholder="title" />
    <textarea v-model="ride.description" placeholder="description" />
    <date-picker v-model="ride.date" :monday-first="true" :language="language"></date-picker>
    <input v-model="ride.reliveLink" type="text" placeholder="relive link" />
    <input v-model="ride.youtubeLink" type="text" placeholder="Youtube vidéo" />
    <input v-model="ride.odo" type="text" placeholder="km à la fin" />
    <input type="file" id="gpxFile" ref="gpxFile" @change="handleFileUpload()">
    <input type="submit" value="Sauvegarder" />
  </form>
</div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';

export default {
  async fetch({ store, params }) {
    await store.dispatch('getRide', params.id);
  },
  data() {
    return {
      ride: Object.assign({}, this.$store.getters.ridesById[this.$route.params.id]),
      language: {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthsAbbr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        rtl: false,
        ymd: false,
        yearSuffix: ''
      }
    };
  },
  methods: {
    saveRide() {
      this.$store.dispatch('saveRide', this.ride);
    }
  },
  components: { DatePicker }
};
</script>
