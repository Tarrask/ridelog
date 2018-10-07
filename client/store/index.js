import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import groupBy from 'lodash/groupBy';
import objectPath from 'object-path';
import Vue from 'vue';
import { getField, updateField } from 'vuex-map-fields';

const initializer = {
  brand() {
    return {
      id: undefined,
      name: '',
      website: ''
    };
  },
  componentType() {
    return {
      id: undefined,
      group: '',
      name: ''
    };
  },
  article() {
    return {
      id: undefined,
      name: '',
      reference: '',
      type: undefined,
      brand: undefined
    };
  },
  bike() {
    return {
      id: undefined,
      brand: undefined,
      name: '',
      pictures: undefined,
      buyDate: undefined,
      buyPrice: undefined,
      sellDate: undefined,
      sellPrice: undefined
    };
  },
  ride() {
    return {
      id: undefined,
      title: '',
      pictures: undefined,
      bike: null,
      description: null,
      reliveLink: null,
      youtubeLink: null,
      odo: null,
      date: null,
      gpxFile: null
    };
  }
};

//  ████  █████   ███   █████  █████
// █        █    █   █    █    █
//  ███     █    █████    █    ████
//     █    █    █   █    █    █
// ████     █    █   █    █    █████
export const state = () => {
  return {
    window: { x: undefined, y: undefined },
    authUser: null,
    rides: [],
    brands: [],
    componentTypes: [],
    articles: [],
    bikes: [],
    sidebar: {
      open: false
    },
    editing: {
      brand: initializer.brand(),
      componentType: initializer.componentType(),
      article: initializer.article(),
      bike: initializer.bike(),
      ride: initializer.ride(),
    }
  };
};

//  ████  █████  █████  █████  █████  ████    ████
// █      █        █      █    █      █   █  █
// █  ██  ███      █      █    ███    ████    ███
// █   █  █        █      █    █      █  █       █
//  ████  █████    █      █    █████  █   █  ████
export const getters = {
  getField,
  typesByGroup(state) {
    let groups = groupBy(state.componentTypes, t => t.group);
    for(let key in groups) {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    }
    return groups;
  },
  sortedGroups(state, getters) {
    return Object.keys(getters.typesByGroup).sort();
  },
  ridesById(state) {
    return state.rides.reduce((acc, ride, index) => {
      acc[ride.id] = ride;
      ride.index = index;
      return acc;
    }, {});
  },
  brandsById(state) {
    return state.brands.reduce((acc, brand, index) => {
      acc[brand.id] = brand;
      brand.index = index;
      return acc;
    }, {});
  },
  bike: (state) => (id) => {
    return state.bikes.find(b => id === b.id);
  }
};

// █   █  █   █  █████   ███   █████  ███   ███   █   █   ████
// ██ ██  █   █    █    █   █    █     █   █   █  ██  █  █
// █ █ █  █   █    █    █████    █     █   █   █  █ █ █   ███
// █   █  █   █    █    █   █    █     █   █   █  █  ██      █
// █   █   ███     █    █   █    █    ███   ███   █   █  ████
export const mutations = {
  updateField,
  SET_WINDOW_DIMENSIONS(state, dimensions) {
    state.window = dimensions;
  },

  OPEN_SIDEBAR(state) {
    state.sidebar.open = true;
  },
  CLOSE_SIDEBAR(state) {
    state.sidebar.open = false;
  },

  SET_USER(state, user) {
    state.authUser = user;
  },

  // SET_RIDE(state, newRide) {
  //   const index = findIndex(state.rides, ride => ride.id === newRide.id);
  //   if(index === -1) {
  //     state.rides.push(newRide);
  //   }
  //   else {
  //     state.rides[index] = newRide;
  //   }
  // },

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
  EDIT_BRAND(state, brand) {
    state.editing.brand = brand ? Object.assign({}, brand) : initializer.brand();
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
  EDIT_COMPONENT_TYPE(state, type) {
    state.editing.componentType = type ? Object.assign({}, type) : initializer.componentType();
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
    Vue.set(state.articles, index, article);
  },
  DELETE_ARTICLE(state, article) {
    let index = findIndex(state.articles, t => t.id === article.id);
    if(index === -1) {
      throw new Error('articleNotFound');
    }
    state.articles.splice(index, 1);
  },
  EDIT_ARTICLE(state, article) {
    state.editing.article = article ? Object.assign({}, article) : initializer.article();
  },

  // ================================ Bikes ====================================
  SET_BIKES(state, bikes) {
    state.bikes = bikes;
  },
  ADD_BIKE(state, bike) {
    state.bikes.push(bike);
  },
  UPDATE_BIKE(state, bike) {
    let index = findIndex(state.bikes, b => b.id === bike.id);
    if(index === -1) {
      throw new Error('bikeNotFound');
    }
    Vue.set(state.bikes, index, bike);
  },
  DELETE_BIKE(state, bike) {
    let index = findIndex(state.bikes, b => b.id === bike.id);
    if(index === -1) {
      throw new Error('bikeNotFound');
    }
    state.bikes.splice(index, 1);
  },
  EDIT_BIKE(state, bike) {
    state.editing.bike = bike ? Object.assign({}, bike) : initializer.bike();
  },

  // ================================ Bikes ====================================
  SET_RIDES(state, rides) {
    state.rides = rides;
  },
  ADD_RIDE(state, ride) {
    state.rides.push(ride);
  },
  UPDATE_RIDE(state, ride) {
    let index = findIndex(state.rides, r => r.id === ride.id);
    if(index === -1) {
      throw new Error('rideNotFound');
    }
    Vue.set(state.rides, index, ride);
  },
  DELETE_RIDE(state, ride) {
    let index = findIndex(state.rides, r => r.id === ride.id);
    if(index === -1) {
      throw new Error('rideNotFound');
    }
    state.rides.splice(index, 1);
  },
  EDIT_RIDE(state, ride) {
    state.editing.ride = ride ? Object.assign({}, ride) : initializer.ride();
  }
};

//  ███    ████  █████  ███   ███   █   █   ████
// █   █  █        █     █   █   █  ██  █  █
// █████  █        █     █   █   █  █ █ █   ███
// █   █  █        █     █   █   █  █  ██      █
// █   █   ████    █    ███   ███   █   █  ████
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
    commit('SET_BIKES', await this.$axios.$get('/api/bike?populate=false'));
    commit('SET_RIDES', await this.$axios.$get('/api/ride?populate=false'));
  },

  async saveBrand({ state, commit }) {
    if(state.editing.brand.id) {
      let saved = await this.$axios.$patch(`/api/brand/${state.editing.brand.id}`, state.editing.brand);
      commit('UPDATE_BRAND', saved);
      commit('EDIT_BRAND');
    }
    else {
      let saved = await this.$axios.$post('/api/brand', omit(state.editing.brand, 'id'));
      commit('ADD_BRAND', saved);
      commit('EDIT_BRAND');
    }
  },
  async deleteBrand({ commit }, brand) {
    await this.$axios.$delete(`/api/brand/${brand.id}`);
    commit('DELETE_BRAND', brand);
  },

  async saveComponentType({ state, commit }) {
    if(state.editing.componentType.id) {
      let saved = await this.$axios.$patch(`/api/componentType/${state.editing.componentType.id}`, state.editing.componentType);
      commit('UPDATE_COMPONENT_TYPE', saved);
      commit('EDIT_COMPONENT_TYPE');
    }
    else {
      let saved = await this.$axios.$post('/api/componentType', omit(state.editing.componentType, 'id'));
      commit('ADD_COMPONENT_TYPE', saved);
      commit('EDIT_COMPONENT_TYPE');
    }
  },
  async deleteComponentType({ commit }, type) {
    await this.$axios.$delete(`/api/componentType/${type.id}`);
    commit('DELETE_COMPONENT_TYPE', type);
  },

  async saveArticle({ state, commit }) {
    if(state.editing.article.id) {
      let saved = await this.$axios.$patch(`/api/article/${state.editing.article.id}`, state.editing.article);
      saved.type = saved.type.id;
      saved.brand = saved.brand.id;
      commit('UPDATE_ARTICLE', saved);
      commit('EDIT_ARTICLE');
    }
    else {
      let saved = await this.$axios.$post('/api/article', omit(state.editing.article, 'id'));
      saved.type = saved.type.id;
      saved.brand = saved.brand.id;
      commit('ADD_ARTICLE', saved);
      commit('EDIT_ARTICLE');
    }
  },
  async deleteArticle({ commit }, article) {
    await this.$axios.$delete(`/api/article/${article.id}`);
    commit('DELETE_ARTICLE', article);
  },

  async saveBike({ state, commit }) {
    if(state.editing.bike.id) {
      let saved = await this.$axios.$patch(`/api/bike/${state.editing.bike.id}?user=${state.authUser.id}`, omit(state.editing.bike, 'user'));
      saved.user = saved.user.id;
      saved.brand = saved.brand.id;
      commit('UPDATE_BIKE', saved);
      // commit('EDIT_BIKE');
    }
    else {
      let saved = await this.$axios.$post(`/api/bike?user=${state.authUser.id}`, omit(state.editing.bike, 'id'));
      saved.user = saved.user.id;
      saved.brand = saved.brand.id;
      commit('ADD_BIKE', saved);
      // commit('EDIT_BIKE');
    }
  },
  async saveRide({ state, commit }) {
    let ride = state.editing.ride;
    if(ride.id) {
      let saved = await this.$axios.$patch(`/api/ride/${ride.id}?user=${state.authUser.id}`, omit(ride, 'user'));
      saved.user = saved.user.id;
      saved.bike = saved.bike ? saved.bike.id : null;
      commit('UPDATE_RIDE', saved);
    }
    else {
      let saved = await this.$axios.$post(`/api/ride?user=${state.authUser.id}`, omit(ride, 'id'));
      saved.user = saved.user.id;
      saved.bike = saved.bike ? saved.bike.id : null;
      commit('ADD_RIDE', saved);
    }
  },
  async deleteBike({ commit }, bike) {
    await this.$axios.$delete(`/api/bike/${bike.id}`);
    commit('DELETE_BIKE', bike);
  },

  async login({ commit, state, dispatch }, { username, password }) {
    try {
      const { data: user } = await this.$axios.$post('/api/user/login', { username, password });
      console.log('Login successful:', user);
      commit('SET_USER', user);
      if(state.window.x > 1080) {
        commit('OPEN_SIDEBAR');
      }

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
    commit('CLOSE_SIDEBAR');
    const data = await this.$axios.$get('/api/user/logout');
    console.log('TODO: handle logout return val:', data);
    commit('SET_USER', null);
  },
  // async createRide({ commit }, ride) {
  //   try {
  //     let formData = new FormData();
  //     formData.append('title', ride.title);
  //     ride.description && formData.append('description', ride.description);
  //     formData.append('reliveLink', ride.reliveLink);
  //     formData.append('youtubeLink', ride.youtubeLink);
  //     ride.odo && formData.append('odo', ride.odo);
  //     if(ride.gpxFile) { formData.append('gpxFile', ride.gpxFile); }
  //
  //     const { data } = await this.$axios.$post('/api/ride', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log('Ride commited:', data);
  //   }
  //   catch(err) {
  //     throw err;
  //   }
  // },
  // async getRide({ commit, getters }, id) {
  //   const ride = await this.$axios.$get(`/api/ride/${id}?populate=false`);
  //   commit('SET_RIDE', ride);
  // },
  // async getRides({ commit }) {
  //   const rides = await this.$axios.$get('/api/ride?populate=false');
  //   commit('SET_RIDES', rides);
  // },
  // async saveRide({ commit }, ride) {
  //   const savedRide = await this.$axios.$patch(`/api/ride/${ride.id}?populate=false`, ride);
  //   commit('SET_RIDE', savedRide);
  // }
};
