<template lang="html">
<div>
  <section class="white-page">
    <h2>Liste des types de composant</h2>
    <ul>
      <li v-for="key of sortedGroups" :key="key"><strong>{{ key }}</strong>
        <ul>
          <li v-for="type in typesByGroup[key]" :key="type.is">
            {{ type.name }}
            <button @click="editType(type)">Editer</button>
            <button @click="deleteType(type)">Supprimer</button>
          </li>
        </ul>
      </li>
      <li><strong>Ajouter un type</strong> <button @click="newType()">Nouveau</button></li>
    </ul>
  </section>
  <section class="form-page">
    <form @submit.prevent="saveType">
      <input type="hidden" name="id" id="id" v-model="id">
      <input type="text" list="groupList" name="group" id="group" v-model="group" placeholder="Groupe" @input="resetButton">
      <input type="text" name="name" id="name" v-model="name" placeholder="Nom" @input="resetButton">
      <datalist id="groupList">
        <option v-for="(group, key) of typesByGroup" :value="key" :key="key"></option>
      </datalist>
      <state-button
        :state="state"
        :label="id ? 'Mettre à jour' : 'Créer'"
        :successLabel="id ? 'Mise à jour effectuée' : 'Type créé'"
        :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
    </form>
  </section>
</div>
</template>

<script>
import { groupBy, omit } from 'lodash';
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
      'editing.componentType.id',
      'editing.componentType.name',
      'editing.componentType.group'
    ]),
    ...mapState([
      'types'
    ]),
    ...mapGetters([
      'typesByGroup',
      'sortedGroups'
    ])
  },
  methods: {
    editType(type) {
      this.resetButton();
      this.$store.commit('EDIT_COMPONENT_TYPE', type);
    },
    newType() {
      this.resetButton();
      this.$store.commit('EDIT_COMPONENT_TYPE');
    },
    async saveType() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveComponentType');
        this.state = State.SUCCESS;
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    async deleteType(type) {
      this.$store.dispatch('deleteComponentType', type);
    },
    resetButton() {
      this.state = State.READY;
    }
  },
  components: { StateButton }
};
</script>

<style lang="scss">
</style>
