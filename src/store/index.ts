import Vue from 'vue';
import Vuex from 'vuex';
import { Gear } from '@/models/gear';
import { VuexData } from '@/models/persistence';
import { Hero } from '@/models';

const DATA_VERSION = '0.1.0';
const KEY_VUEXDATA = 'vuex.data';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    gears: Array<Gear.Gear>(),
    data: {
      version: DATA_VERSION,
      gears: []
    } as VuexData
  },
  getters: {
    getGearMap: state => {
      let map = new Map<String, Gear.Gear>();
      state.gears.forEach((x: Gear.Gear) => {
        map.set(x.id, x);
      });
      return map;
    }
  },
  mutations: {
    loading(state: any, value) {
      state.loading = value;
    },
    updateGears(state: any, value: Array<Gear.Gear>) {
      Vue.set(state, 'gears', value);
      state.data.gears = value;
    },
    updateGear(state: any, value: Gear.Gear) {
      // TODO: add or update
      console.log('updateGear::value = ', value);
      state.gears.push(value);
      state.data.gears = state.gears;
    },
    setData(state: any, value: VuexData) {
      Vue.set(state, 'data', value);
    },
    persistData(state: any, value: VuexData) {
      localStorage.setItem(KEY_VUEXDATA, JSON.stringify(state.data));
    }
    // persistGears(state: any, value: Array<Gear.Gear>) {
    //   this.updateGears(state, value);
    // }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    },
    initVuex: ({ commit }) => {
      console.log('initVuex::called');
      if (localStorage.getItem(KEY_VUEXDATA) != null) {
        let data = JSON.parse(localStorage.getItem(KEY_VUEXDATA)!!);
        if (data && (data as VuexData).version && (data as VuexData).version == DATA_VERSION) {
          console.log('initVuex::data version matches');
          commit('setData', data);
          commit(
            'updateGears',
            (data.gears as Array<any>).map(x => Object.assign(new Gear.Gear(''), x))
          );
        } else {
          // TODO: alert if not match
          console.log('initVuex::CAUTION! Data version does not match');
        }
      }
    },
    updateGears: ({ commit }, gears: Array<Gear.Gear>) => {
      commit('updateGears', gears);
      commit('persistData');
    },
    updateGear: ({ commit }, gear: Gear.Gear) => {
      commit('updateGear', gear);
      commit('persistData');
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
