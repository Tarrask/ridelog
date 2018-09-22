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
      <form @submit.prevent="updateArticle">
        <input type="hidden" name="id" id="id" v-model="article._id">
        <input type="text" name="name" id="name" placeholder="Nom" v-model="article.name" @input="resetButton">
        <input type="text" name="name" id="name" placeholder="Nom" v-model="name" @input="resetButton">
        <input type="text" name="reference" id="reference" placeholder="Référence" v-model="article.reference" @input="resetButton">
        <select name="type" id="type" v-model="article.type" @change="resetButton" :class="{ placeholder: !article.type }">
          <option :value="null">&mdash; Faites un choix &mdash;</option>
          <optgroup v-for="key in sortedGroups" :label="key" :key="key">
            <option v-for="type in typesByGroup[key]" :value="type.id" :key="type.is">{{ type.name }}</option>
          </optgroup>
        </select>
        <select name="brand" id="brand" v-model="article.brand" @change="resetButton">
          <option :value="null">&mdash; Faites un choix &mdash;</option>
          <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}</option>
        </select>
        <state-button
          :state="state"
          :label="article.id ? 'Mettre à jour' : 'Créer'"
          :successLabel="article.id ? 'Mise à jour effectuée' : 'Article créé'"
          :errorLabel="article.id ? 'Echec de la mise à jour' : 'Echec de la création'"></state-button>
      </form>
    </section>
  </div>
</template>

<script>
import { groupBy, omit } from 'lodash';
import { mapFields } from 'vuex-map-fields';

import StateButton, * as State from '@/components/StateButton';

function initialArticle() {
  return {
    id: null,
    name: '',
    reference: '',
    type: null,
    brand: null
  };
}

function bindProps(base, props) {
  return props.reduce((acc, prop) => {
    acc[prop] = {
      get() { return this.$store.getters.editing([base, prop]); },
      set(value) { return this.$store.commit('UPDATE_EDITING', { prop: [base, prop], value }); }
    };
    return acc;
  }, {});
}

export default {
  data() {
    return {
      article: initialArticle(),
      state: State.READY
    };
  },
  computed: {
    //...bindProps('article', ['name', 'reference']),
    ...mapFields([
      'editing.article.name'
    ]),
    articles() {
      return this.$store.state.articles;
    },
    types() {
      return this.$store.state.componentTypes;
    },
    typesByGroup() {
      let groups = groupBy(this.types, t => t.group);
      for (let key in groups) {
        groups[key].sort((a, b) => a.name.localeCompare(b.name));
      }
      return groups;
    },
    sortedGroups() {
      return Object.keys(this.typesByGroup).sort();
    },
    brands() {
      return this.$store.state.brands;
    }
  },
  methods: {
    editArticle(article) {
      this.resetButton();
      this.article = Object.assign({}, article);
    },
    newArticle() {
      this.resetButton();
      this.resetArticle();
    },
    async updateArticle() {
      try {
        this.state = State.PENDING;
        let article = this.article.id
          ? await this.$axios.$patch(`/api/article/${this.article.id}`, this.article)
          : await this.$axios.$post('/api/article', omit(this.article, 'id'));
        this.$store.commit(this.article.id ? 'UPDATE_ARTICLE' : 'ADD_ARTICLE', article);
        this.state = State.SUCCESS;
      }
      catch(err) {
        console.log(err);
        this.state = State.ERROR;
      }
    },
    async deleteArticle(article) {
      await this.$axios.$delete(`/api/article/${article.id}`);
      this.$store.commit('DELETE_ARTICLE', article);
    },
    resetArticle() {
      this.article = initialArticle();
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
