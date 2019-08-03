<template lang="html">
  <div class="white-page">
    <header>
      <img :src="`/api/uploader/get/${bike.pictures[0]}`">
    </header>
    <h2><span class="brand">{{ brand.name }}</span> {{ bike.name }}</h2>
    <button @click="editBike">Edit bike details</button>
    <button @click="newRide">Nouvelle sortie</button>
    <button @click="newServicing">Nouveau service</button>
    <button @click="deleteBike">Supprimer le vélo</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    bike() {
      return this.$store.getters.record({ type: 'bike', id: this.$route.params.id });
    },
    brand() {
      return this.$store.getters.record({ type: 'brand', id: this.bike.brand });
    }
  },
  methods: {
    editBike() {
      this.$store.commit('EDIT_RECORD', { type: 'bike', record: this.bike });
      this.$router.push('/bike/edit');
    },
    newRide() {
      this.$store.commit('NEW_RECORD', { type: 'ride', prefill: { bike: this.bike.id }});
      this.$router.push('/ride/edit');
    },
    newServicing() {
      this.$store.commit('NEW_RECORD', { type: 'servicing', prefill: { bike: this.bike.id }});
      this.$router.push('/servicing/edit');
    },
    async deleteBike() {
      await this.$store.dispatch('deleteRecord', { type: 'bike', record: this.bike });
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.brand {
    color: gray;
    font-weight: normal;
}

header {
  margin: calc(-2.5em - 1px);
  margin-bottom: calc(-2.5em - 1px);
  overflow-y: hidden;
  max-height: 400px;
  vertical-align: center;
  margin-bottom: 2.5em;
  display: flex;
  align-items: center;

  border-radius: 3px 3px 0 0;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
