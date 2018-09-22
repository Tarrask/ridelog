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
    <form @submit.prevent="updateType">
      <input type="hidden" name="id" id="id" v-model="type.id">
      <input type="text" list="groupList" name="group" id="group" v-model="type.group" placeholder="Groupe" @input="resetButton">
      <input type="text" name="name" id="name" v-model="type.name" placeholder="Nom" @input="resetButton">
      <datalist id="groupList">
        <option v-for="(group, key) of typesByGroup" :value="key" :key="key"></option>
      </datalist>
      <state-button
        :state="state"
        :label="type.id ? 'Mettre à jour' : 'Créer'"
        :successLabel="type.id ? 'Mise à jour effectuée' : 'Type créé'"
        :errorLabel="type.id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
    </form>
  </section>
</div>
</template>

<script>
import { groupBy, omit } from 'lodash';

import StateButton, * as State from '@/components/StateButton';

function initialType() {
  return {
    id: null,
    group: '',
    name: ''
  };
}

export default {
  data() {
    return {
      type: initialType(),
      state: State.READY
    };
  },
  computed: {
    types() {
      return this.$store.state.componentTypes;
    },
    typesByGroup() {
      let groups = groupBy(this.types, t => t.group);
      for (let key in groups) {
        groups[key].sort((a, b) => String.localeCompare(a.name, b.name));
      }
      return groups;
    },
    sortedGroups() {
      let groups = Object.keys(this.typesByGroup).sort();
      return groups;
    }
  },
  methods: {
    editType(type) {
      this.resetButton();
      this.type = Object.assign({}, type);
    },
    newType() {
      this.resetButton();
      this.resetType();
    },
    async updateType(type) {
      try {
        this.state = State.PENDING;
        let type = this.type.id
          ? await this.$axios.$patch(`/api/componentType/${this.type.id}`, this.type)
          : await this.$axios.$post('/api/componentType', omit(this.type, 'id'));
        this.$store.commit(this.type.id ? 'UPDATE_COMPONENT_TYPE' : 'ADD_COMPONENT_TYPE', type);
        this.state = State.SUCCESS;
      }
      catch(err) {
        this.state = State.ERROR;
      }
    },
    async deleteType(type) {
      await this.$axios.$delete(`/api/componentType/${type.id}`);
      this.$store.commit('DELETE_COMPONENT_TYPE', type);
    },
    resetType() {
      this.type = initialType();
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
