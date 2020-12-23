import Vue from 'vue';
import Vuex from 'vuex';
import { Gear } from '@/models/gear';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    gears: Array<Gear.Gear>()
  },
  mutations: {
    loading(state: any, value) {
      state.loading = value;
    },
    updateGears(state: any, value: Array<Gear.Gear>) {
      console.log(value);
      Vue.set(state, 'gears', value);
    }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    },
    updateGears: ({ commit }, gears: Array<Gear.Gear>) => {
      commit('updateGears', gears);
    }
    // toggleMenu: ({ commit, state }) => {
    //   commit('menu', !state.menu);
    // }
  },
  modules: {}
});
