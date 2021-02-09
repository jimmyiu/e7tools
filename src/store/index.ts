import Vue from 'vue';
import Vuex from 'vuex';
import { Gear, Constants, Hero, OptimizationProfile } from '@/models';
import { E7dbData, PersistentData, VuexData } from '@/models/persistence';
import E7dbDataHandler from '@/services/e7db-data-handler';
import { DataUpgrader } from '@/services/data-converter';

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
      version: Constants.CURRENT_PERSISTENT_DATA_VERSION,
      gears: [],
      profiles: []
    } as VuexData
  },
  getters: {
    getGearMap: state => {
      let map = new Map<String, Gear.Gear>();
      state.gears.forEach((x: Gear.Gear) => {
        map.set(x.id, x);
      });
      return map;
    },
    getEquipped: state => (heroId: string) => {
      const builder = new Gear.GearCombinationBuilder();
      state.gears.filter(x => x.equippedHero == heroId).forEach(x => builder.setGear(x));
      return builder.build(-1);
    },
    getProfile: state => (heroId: string) => {
      return state.data.profiles.find(x => x.hero.id == heroId);
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
    saveProfile(state, profile: OptimizationProfile) {
      if (profile.hero.id) {
        const index = state.data.profiles.findIndex(x => x.hero.id == profile.hero.id);
        if (index < 0) {
          state.data.profiles.push(profile);
        } else {
          state.data.profiles.splice(index, 1, profile);
        }
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
    persistData(state: any) {
      localStorage.setItem(Constants.KEY_VUEXDATA, JSON.stringify(state.data));
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
      commit('persistData');
    },
    updateGear: ({ commit, state }, gear: Gear.Gear) => {
      commit('updateGear', gear);
      state.data.gears = state.gears;
      commit('persistData');
    },
    deleteGear: ({ commit, state }, gear: Gear.Gear) => {
      commit('deleteGear', gear);
      state.data.gears = state.gears;
      commit('persistData');
    },
    // profiles
    updateProfiles: ({ commit }, profiles: OptimizationProfile[]) => {
      profiles.forEach(profile => commit('saveProfile', Object.assign({}, profile)));
      commit('persistData');
    },
    // initialization
    initVuex: ({ commit, dispatch }) => {
      console.log('initVuex::called');
      if (localStorage.getItem(Constants.KEY_VUEXDATA) != null) {
        let data = JSON.parse(localStorage.getItem(Constants.KEY_VUEXDATA)!!);
        if (data && (data as PersistentData).version) {
          if ((data as PersistentData).version == Constants.CURRENT_PERSISTENT_DATA_VERSION) {
            console.log('initVuex::data version matches');
            commit('restoreData', data);
          } else {
            console.log('initVuex::CAUTION! Data version does not match');
            const result = DataUpgrader.upgrade(data);
            console.log(result);
            data = result;
            commit('restoreData', data);
            commit('persistData');
          }
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
