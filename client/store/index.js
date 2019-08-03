import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import groupBy from 'lodash/groupBy';
import cloneDeep from 'lodash/cloneDeep';
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
      name: '',
      pictures: undefined,
      bike: null,
      description: '',
      reliveLink: null,
      youtubeLink: null,
      odo: null,
      date: null,
      gpxFile: null
    };
  },
  servicing() {
    return {
      id: undefined,
      bike: null,
      name: undefined,
      description: '',
      odo: null,
      date: null,
      modifications: []
    };
  },
  modification() {
    return {
      id: undefined,
      price: undefined
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
    model: {},
    // rides: [],
    // brands: [],
    // componentTypes: [],
    // articles: [],
    // bikes: [],
    sidebar: {
      open: false
    },
    editing: {
      brand: initializer.brand(),
      componentType: initializer.componentType(),
      article: initializer.article(),
      bike: initializer.bike(),
      ride: initializer.ride(),
      servicing: initializer.servicing()
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
    let groups = groupBy(state.model.componentType, t => t.group);
    for(let key in groups) {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    }
    return groups;
  },
  sortedGroups(state, getters) {
    return Object.keys(getters.typesByGroup).sort();
  },
  articlesByType(state) {
    return groupBy(state.model.article, a => a.type);
  },
  bike: (state) => (id) => {
    return state.bikes.find(b => id === b.id);
  },
  brand: (state) => (id) => {
    return state.brands.find(b => id === b.id);
  },
  record: (state) => ({ type, id }) => {
    return state.model[type].find(r => id === r.id);
  },
  records: (state) => (type) => {
    return state.model[type];
  },
  recordsById: (state) => (type) => {
    return state.model[type].reduce((acc, record, index) => {
      acc[record.id] = record;
      record.index = index;
      return acc;
    }, {});
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

  SET_RECORDS(state, { type, records }) {
    Vue.set(state.model, type, records);
  },
  ADD_RECORD(state, { type, record }) {
    state.model[type].push(record);
  },
  UPDATE_RECORD(state, { type, record }) {
    let index = findIndex(state.model[type], r => r.id === record.id);
    if(index === -1) {
      throw new Error('Record not found');
    }
    Vue.set(state.model[type], index, record);
  },
  DELETE_RECORD(state, { type, record }) {
    let index = findIndex(state.model[type], r => r.id === record.id);
    if(index === -1) {
      throw new Error('Record not found');
    }
    state.model[type].splice(index, 1);
  },
  EDIT_RECORD(state, { type, record }) {
    if(record) {
      Vue.set(state.editing, type, cloneDeep(record));
    }
    else {
      Vue.set(state.editing, type, initializer[type]());
    }
  },
  NEW_RECORD(state, { type, prefill }) {
    Vue.set(state.editing, type, Object.assign(initializer[type](), prefill));
  },
  addModificationRow(state, modification) {
    state.editing.servicing.modifications.push(modification);
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
    commit('SET_RECORDS', { type: 'brand', records: await this.$axios.$get('/api/brand')});
    commit('SET_RECORDS', { type: 'componentType', records: await this.$axios.$get('/api/componentType')});
    commit('SET_RECORDS', { type: 'article', records: await this.$axios.$get('/api/article?populate=false')});
    commit('SET_RECORDS', { type: 'bike', records: await this.$axios.$get('/api/bike?populate=false')});
    commit('SET_RECORDS', { type: 'ride', records: await this.$axios.$get('/api/ride?populate=false')});
    commit('SET_RECORDS', { type: 'servicing', records: await this.$axios.$get('/api/servicing?populate=false')});
  },

  async saveRecord({ state, commit}, type) {
    let record = state.editing[type];
    console.log('saving record:', type, record);
    if(record.id) {
      let saved = await this.$axios.$patch(`/api/${type}/${record.id}?populate=false`, removeNull(record));
      commit('UPDATE_RECORD', { type, record: unpopulate(saved) });
      commit('NEW_RECORD', { type });
    }
    else {
      let saved = await this.$axios.$post(`/api/${type}`, removeNull(omit(record, 'id')));
      commit('ADD_RECORD', { type, record: unpopulate(saved) });
      commit('NEW_RECORD', { type });
    }
  },
  async deleteRecord({ commit }, { type, record }) {
    await this.$axios.$delete(`/api/${type}/${record.id}`);
    commit('DELETE_RECORD', { type, record });
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
};

function removeNull(record) {
  for(let key in record) {
    if(record[key] === null) {
      delete record[key];
    }
  }
  return record;
}

function unpopulate(record) {
  for(let key in record) {
    if(record[key] && record[key].id) {
      record[key] = record[key].id;
    }
  }
  return record;
}
