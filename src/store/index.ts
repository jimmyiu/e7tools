import Vue from 'vue';
import Vuex from 'vuex';
import { Gear } from '@/models/gear';

const KEY_GEARS = 'vuex.gears';
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
      Vue.set(state, 'gears', value);
      // console.log(JSON.stringify(state.gears).length);
      localStorage.setItem(KEY_GEARS, JSON.stringify(state.gears));
    },
    updateGear(state: any, value: Gear.Gear) {
      // TODO: add or update
      state.gears.push(value);
      // console.log(JSON.stringify(state.gears).length);
      localStorage.setItem(KEY_GEARS, JSON.stringify(state.gears));
    }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    },
    initApp: ({ commit }) => {
      let result = new Array<Gear.Gear>();
      if (localStorage.getItem(KEY_GEARS) != null) {
        // console.log(JSON.parse(localStorage.getItem(KEY_GEARS)!!));
        (JSON.parse(localStorage.getItem(KEY_GEARS)!!) as Array<any>).forEach(x => {
          let item = Object.assign(new Gear.Gear(''), x);
          result.push(item);
        });
      }
      commit('updateGears', result);
    },
    updateGears: ({ commit }, gears: Array<Gear.Gear>) => {
      commit('updateGears', gears);
    },
    updateGear: ({ commit }, gear: Gear.Gear) => {
      commit('updateGear', gear);
    },
    getHeros: ({ commit }) => {
      return undefined;
    }
    // toggleMenu: ({ commit, state }) => {
    //   commit('menu', !state.menu);
    // }
  },
  modules: {}
});
