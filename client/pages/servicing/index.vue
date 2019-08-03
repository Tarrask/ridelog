<template lang="html">
  <div class="white-page">
    <h2>Maintenances</h2>
    <button @click="newServicing">Nouveau service</button>
    <table>
      <tbody>
        <tr v-for="servicing in servicings" :key="servicing.id">
          <td>{{ servicing.name }}</td>
          <td>
            <button @click="editServicing(servicing)">edit</button>
            <button @click="deleteServicing(servicing)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    servicings() { return this.$store.state.model.servicing; }
  },
  methods: {
    newServicing() {
      this.$store.commit('NEW_RECORD', { type: 'servicing' });
      this.$router.push('/servicing/edit');
    },
    editServicing(record) {
      this.$store.commit('EDIT_RECORD', { type: 'servicing', record });
      this.$router.push('/servicing/edit');
    },
    deleteServicing(record) {
      this.$store.dispatch("deleteRecord", { type: 'servicing', record });
    }
  }
};
</script>

<style lang="scss">
</style>
