import { findIndex } from 'lodash';
import objectPath from 'object-path';
import Vue from 'vue';
import { getField, updateField } from 'vuex-map-fields';

const initializer = {
  article() {
    return {
      name: '',
      reference: ''
    };
  }
};

export const state = () => {
  return {
    authUser: null,
    rides: [],
    brands: [],
    componentTypes: [],
    articles: [],
    editing: {
      ride: {},
      brand: {},
      componentType: {},
      article: initializer.article()
    }
  };
};

export const getters = {
  getField,
  editing: (state) => (prop) => {
    return objectPath.get(state.editing, prop);
  },
  ridesById(state) {
    return state.rides.reduce((acc, ride, index) => {
      acc[ride.id] = ride;
      ride.index = index;
      return acc;
    }, {});
  }
};

export const mutations = {
  updateField,
  SET_USER(state, user) {
    state.authUser = user;
  },

  UPDATE_EDITING(state, { prop, value }) {
    objectPath.set(state.editing, prop, value);
  },

  SET_RIDE(state, newRide) {
    const index = findIndex(state.rides, ride => ride.id === newRide.id);
    if(index === -1) {
      state.rides.push(newRide);
    }
    else {
      state.rides[index] = newRide;
    }
  },
  SET_RIDES(state, rides) {
    state.rides = rides;
  },

  // ================================== Brands =================================
  SET_BRANDS(state, brands) {
    state.brands = brands;
  },
  ADD_BRAND(state, brand) {
    state.brands.push(brand);
  },
  UPDATE_BRAND(state, brand) {
    let index = findIndex(state.brands, b => b.id === brand.id);
    if(index === -1) {
      throw new Error('brandNotFound');
    }
    Vue.set(state.brands, index, brand);
  },
  DELETE_BRAND(state, brand) {
    let index = findIndex(state.brands, b => b.id === brand.id);
    if(index === -1) {
      throw new Error('brandNotFound');
    }
    state.brands.splice(index, 1);
  },

  // ============================= Component types =============================
  SET_COMPONENT_TYPES(state, types) {
    state.componentTypes = types;
  },
  ADD_COMPONENT_TYPE(state, type) {
    state.componentTypes.push(type);
  },
  UPDATE_COMPONENT_TYPE(state, type) {
    let index = findIndex(state.componentTypes, t => t.id === type.id);
    if(index === -1) {
      throw new Error('componentTypeNotFound');
    }
    Vue.set(state.componentTypes, index, type);
  },
  DELETE_COMPONENT_TYPE(state, type) {
    let index = findIndex(state.componentTypes, t => t.id === type.id);
    if(index === -1) {
      throw new Error('componentTypeNotFound');
    }
    state.componentTypes.splice(index, 1);
  },

  // ================================ Articles =================================
  SET_ARTICLES(state, articles) {
    state.articles = articles;
  },
  ADD_ARTICLE(state, article) {
    state.articles.push(article);
  },
  UPDATE_ARTICLE(state, article) {
    let index = findIndex(state.articles, a => a.id === article.id);
    if(index === -1) {
      throw new Error('articleNotFound');
    }
    Vue.set(state.article, index, article);
  },
  DELETE_ARTICLE(state, article) {
    let index = findIndex(state.articles, t => t.id === article.id);
    if(index === -1) {
      throw new Error('articleNotFound');
    }
    state.articles.splice(index, 1);
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app }) {
    console.log('nuxtServerInit');

    try {
      const { data } = await app.$axios.$get('/api/user/whoami');
      commit('SET_USER', data);

      if(data) {
        await dispatch('initPrivateState');
      }
    }
    catch(err) {
      if(err.response && err.response.status === 401) {
        return;
      }
      console.log('error getting whoami', err);
    }
  },
  async initPrivateState({ commit }) {
    commit('SET_BRANDS', await this.$axios.$get('/api/brand'));
    commit('SET_COMPONENT_TYPES', await this.$axios.$get('/api/componentType'));
    commit('SET_ARTICLES', await this.$axios.$get('/api/article?populate=false'));
  },

  async login({ commit, dispatch }, { username, password }) {
    try {
      const { data: user } = await this.$axios.$post('/api/user/login', { username, password });
      console.log('Login successful:', user);
      commit('SET_USER', user);

      await dispatch('initPrivateState');
    }
    catch(err) {
      if(err.response && err.response.status === 401) {
        console.log('Bad credentials');
        commit('SET_USER', null);
      }

      throw err;
    }
  },
  async logout({ commit }) {
    const data = await this.$axios.$get('/api/user/logout');
    console.log('TODO: handle logout return val:', data);
    commit('SET_USER', null);
  },
  async createRide({ commit }, ride) {
    try {
      let formData = new FormData();
      formData.append('title', ride.title);
      ride.description && formData.append('description', ride.description);
      formData.append('reliveLink', ride.reliveLink);
      formData.append('youtubeLink', ride.youtubeLink);
      ride.odo && formData.append('odo', ride.odo);
      if(ride.gpxFile) { formData.append('gpxFile', ride.gpxFile); }

      const { data } = await this.$axios.$post('/api/ride', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Ride commited:', data);
    }
    catch(err) {
      throw err;
    }
  },
  async getRide({ commit, getters }, id) {
    const ride = await this.$axios.$get(`/api/ride/${id}?populate=false`);
    commit('SET_RIDE', ride);
  },
  async getRides({ commit }) {
    const rides = await this.$axios.$get('/api/ride?populate=false');
    commit('SET_RIDES', rides);
  },
  async saveRide({ commit }, ride) {
    const savedRide = await this.$axios.$patch(`/api/ride/${ride.id}?populate=false`, ride);
    commit('SET_RIDE', savedRide);
  }
};
