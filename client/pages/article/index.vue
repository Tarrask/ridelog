<template lang="html">
  <div>
    <section class="white-page">
      <h2>Liste des articles</h2>
      <ul>
        <li v-for="article in articles" :key="article.id">
          {{ article.name }}
          <button @click="editArticle(article)">Editer</button>
          <button @click="deleteArticle(article)">Supprimer</button>
        </li>
        <li>Ajouter un article <button @click="newArticle()">Nouveau</button></li>
      </ul>
    </section>
    <section class="form-page">
      <form @submit.prevent="saveArticle">
        <input type="hidden" name="id" id="id" v-model="id">
        <input type="text" name="name" id="name" placeholder="Nom" v-model="name" @input="resetButton">
        <input type="text" name="reference" id="reference" placeholder="Référence" v-model="reference" @input="resetButton">
        <select name="type" id="type" v-model="type" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <optgroup v-for="key in sortedGroups" :label="key" :key="key">
            <option v-for="type in typesByGroup[key]" :value="type.id" :key="type.is">{{ type.name }}</option>
          </optgroup>
        </select>
        <select name="brand" id="brand" v-model="brand" @change="resetButton">
          <option :value="undefined">&mdash; Faites un choix &mdash;</option>
          <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}</option>
        </select>
        <state-button
          :state="state"
          :label="id ? 'Mettre à jour' : 'Créer'"
          :successLabel="id ? 'Mise à jour effectuée' : 'Article créé'"
          :errorLabel="id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </form>
    </section>
  </div>
</template>

<script>
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
      'editing.article.id',
      'editing.article.name',
      'editing.article.reference',
      'editing.article.type',
      'editing.article.brand'
    ]),
    ...mapState({
      articles: state => state.model.article,
      componentTypes: state => state.model.componentType,
      brands: state => state.model.brand
    }),
    ...mapGetters([
      'typesByGroup',
      'sortedGroups'
    ])
  },
  methods: {
    editArticle(article) {
      this.resetButton();
      this.$store.commit('EDIT_RECORD', { type: 'article', record: article });
    },
    newArticle() {
      this.resetButton();
      this.$store.commit('NEW_RECORD', { type: 'article' });
    },
    async saveArticle() {
      try {
        this.state = State.PENDING;
        await this.$store.dispatch('saveRecord', 'article');
        this.state = State.SUCCESS;
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    async deleteArticle(article) {
      this.$store.dispatch('deleteRecord', { type: 'article', record: article });
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
