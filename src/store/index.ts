import Vue from 'vue';
import Vuex from 'vuex';
import { Gear, Constants, Hero } from '@/models';
import { E7dbData, PersistentData, VuexData } from '@/models/persistence';
import E7dbDataHandler from '@/services/e7db-data-handler';
import { DataUpgrader } from '@/services/data-converter';

const DATA_VERSION = '0.1.0';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    gears: Array<Gear.Gear>(),
    e7db: {
      date: Date.now(),
      heros: []
    } as E7dbData,
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
    },
    updateGear(state: any, value: Gear.Gear) {
      console.log('updateGear::value = ', value);
      const index = state.gears.findIndex((x: Gear.Gear) => x.id == value.id);
      if (index < 0) {
        state.gears.push(value);
      } else {
        // Object.assign(state.gears[index], value);
        state.gears.splice(index, 1, value);
      }
    },
    deleteGear(state: any, value: Gear.Gear) {
      console.log('deleteGear::value = ', value);
      const index = state.gears.findIndex((x: Gear.Gear) => x.id == value.id);
      if (index >= 0) {
        state.gears.splice(index, 1);
      }
    },
    setE7dbHeros(state: any, value: Hero[]) {
      state.e7db.date = Date.now();
      state.e7db.heros = value;
    },
    //
    restoreData(state: any, value: VuexData) {
      Vue.set(state, 'data', value);
    },
    restoreE7db(state: any, value: E7dbData) {
      Vue.set(state, 'e7db', value);
    },
    persistData(state: any, value: VuexData) {
      localStorage.setItem(Constants.KEY_VUEXDATA, JSON.stringify(value));
    },
    persistE7db(state: any, value: E7dbData) {
      localStorage.setItem(Constants.KEY_E7DBDAYA, JSON.stringify(state.e7db));
    }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    },
    updateGears: ({ commit, state }, gears: Array<Gear.Gear>) => {
      commit('updateGears', gears);
      state.data.gears = gears;
      commit('persistData', state.data);
    },
    updateGear: ({ commit, state }, gear: Gear.Gear) => {
      commit('updateGear', gear);
      state.data.gears = state.gears;
      commit('persistData', state.data);
    },
    deleteGear: ({ commit, state }, gear: Gear.Gear) => {
      commit('deleteGear', gear);
      state.data.gears = state.gears;
      commit('persistData', state.data);
    },

    initVuex: ({ commit, dispatch }) => {
      console.log('initVuex::called');
      if (localStorage.getItem(Constants.KEY_VUEXDATA) != null) {
        let data = JSON.parse(localStorage.getItem(Constants.KEY_VUEXDATA)!!);
        if (data && (data as PersistentData).version) {
          if ((data as PersistentData).version == Constants.CURRENT_PERSISTENT_DATA_VERSION) {
            console.log('initVuex::data version matches');
          } else {
            console.log('initVuex::CAUTION! Data version does not match');
            const result = DataUpgrader.upgrade(data);
            console.log(result);
            data = result;
            commit('persistData', data);
          }
          commit('restoreData', data);
          commit(
            'updateGears',
            (data.gears as Array<any>).map(x => {
              const result = new Gear.Gear(x.type, x.set, x.id, x.grade, x.level, x.enhance, x.main);
              return Object.assign(result, x);
            })
          );
        } else {
          // TODO: alert if not match
          console.log('initVuex::CAUTION! invalid persistent data');
        }
      }
      if (localStorage.getItem(Constants.KEY_E7DBDAYA) != null) {
        // TODO: validation
        console.log('initVuex::restoreE7db');
        commit('restoreE7db', JSON.parse(localStorage.getItem(Constants.KEY_E7DBDAYA)!!));
      } else {
        // cache data
        // console.log('initE7dbData');
        // dispatch('withLoading', async () => {
        //   await dispatch('initE7dbData');
        // });
      }
    },
    initE7dbData: async ({ commit, state }) => {
      const heros = await E7dbDataHandler.retrieveHeros();
      commit('setE7dbHeros', heros);
      localStorage.setItem(Constants.KEY_E7DBDAYA, JSON.stringify(state.e7db));
    }
  },
  modules: {}
});
