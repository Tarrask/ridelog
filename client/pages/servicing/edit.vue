<template lang="html">
  <section class="form-page">
    <form @submit.prevent="saveServicing">
      <input type="hidden" name="id" id="id" v-model="id">
      <input type="hidden" name="user" id="user" v-model="user">
      <input type="text" name="name" id="name" placeholder="Titre" v-model="name" @input="resetButton">
      <textarea placeholder="Description" v-model="description"></textarea>
      <div class="combo">
        <select name="bike" id="bike" v-model="bike" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <option v-for="bike in bikes" :value="bike.id" :key="bike.id">{{ bike.name }}</option>
        </select>
        <button class="btn" @click.prevent="newBike">+</button>
      </div>
      <input type="number" name="odo" id="odo" placeholder="Kilometrage lors du service" v-model="odo" @input="resetButton">
      <input type="date" name="date" id="date" placeholder="Date de la sortie" v-model="date" @input="resetButton">
      <h3>Modifications</h3>
      <div v-for="(modification, index) in modificationsList" :key="`edit-${index}`">
        <modification-item :modification="modification" @delete-item="removeModification(index)"></modification-item>
        <!-- <select :name="`modification-${index}`" :id="`modification-${index}`" v-model="modification.id" @change="resetButton">
          <option :value="null">&mdash; Faites un choix &mdash;</option>
          <optgroup v-for="group in sortedGroups" :key="group" :label="group">
            <optgroup v-for="type in typesByGroup[group]" :key="type.id" :label="type.name">
              <option v-for="article in articlesByType[type.id]" :key="`${group}-${article.id}`" :value="article.id">{{ article.name }}</option>
            </optgroup>
          </optgroup>
        </select>
        <input type="number" placeholder="prix" v-model="modification.price">
        <button @click="removeModification(index)" class="btn">x</button> -->
      </div>
      <div v-for="(modification, index) in modificationsList" :key="`list-${index}`">
        {{ index }} {{ modification.id }} {{ modification.price }}
      </div>
      <div  class="btn-row">
        <button @click.prevent="$router.go(-1)" class="btn btn-cancel">Annuler</button>
        <state-button
          :state="state"
          :label="id ? 'Mettre à jour' : 'Créer'"
          :successLabel="id ? 'Mise à jour effectuée' : 'Service créé'"
          :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

import StateButton, * as State from '@/components/StateButton';
import ModificationItem from '@/components/ModificationItem';

export default {
  components: { StateButton, ModificationItem },
  data() {
    return {
      state: State.READY,
      // modifications: [],
      nextModification: { id: null, price: undefined}
    };
  },
  computed: {
    ...mapFields([
      'editing.servicing.id',
      'editing.servicing.user',
      'editing.servicing.name',
      'editing.servicing.bike',
      'editing.servicing.description',
      'editing.servicing.odo',
      'editing.servicing.date'
    ]),
    ...mapMultiRowFields([ 'editing.servicing.modifications' ]),
    ...mapGetters([ 'sortedGroups', 'typesByGroup', 'articlesByType' ]),
    ...mapState({
      bikes: state => state.model.bike,
      articles: state => state.model.article
    }),
    modificationsList() {
      return [...this.modifications, this.nextModification];
    }
  },
  watch: {
    nextModification: {
      handler(newVal) {
        if(newVal.id || newVal.price) {
          console.log('nextMod change:', newVal.id);
          // this.modifications.push(newVal);
          this.$store.commit('addModificationRow', newVal);
          this.nextModification = { id: null, price: undefined };
        }
      },
      deep: true
    }
  },
  methods: {
    removeModification(index) {
      this.modifications.splice(index, 1);
    },
    async saveRide() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'servicing');
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
    newBike() {
      this.$store.commit('NEW_RECORD', { type: 'bike' });
      this.$router.push('/bike/edit');
    },
    async saveServicing() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'servicing');
        this.state = State.SUCCESS;
        setTimeout(() => {
          this.$router.go(-1);
        }, 500);
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    }
  }
};
</script>

<style lang="scss">
.input-group {
  display: flex;
}
optgroup {
  padding-left: 1em;
}
</style>
