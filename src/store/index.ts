import Vue from 'vue';
import Vuex from 'vuex';
import { VuexData, Gear, Hero, OptimizationProfile } from '@/models';
import E7dbDataHandler from '@/services/e7db-data-handler';
import { persistenceService } from '@/services/presistence';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    data: {
      gears: [],
      // TODO: should NOT use vuex to store profile
      profiles: [],
      heros: []
    } as VuexData
  },
  getters: {
    gears: state => {
      return state.data.gears;
    },
    heros: state => {
      return state.data.heros;
    },
    getGear: state => (gearId: string) => {
      return state.data.gears.find(x => x.id == gearId);
    },
    getProfile: state => (heroId: string) => {
      return state.data.profiles.find(x => x.heroId == heroId);
    },
    getHero: state => (heroId: string) => {
      return state.data.heros.find(x => x.id == heroId);
    },
    getEquipped: state => (heroId: string) => {
      const builder = new Gear.GearCombinationBuilder();
      state.data.gears.filter(x => x.equippedHero == heroId).forEach(x => builder.setGear(x));
      return builder.build(-1);
    }
  },
  mutations: {
    loading(state: any, value) {
      state.loading = value;
    },
    saveGear(state: any, value: Gear.Gear) {
      console.log('saveGear::value = ', value);
      const index = state.data.gears.findIndex((x: Gear.Gear) => x.id == value.id);
      if (index < 0) {
        state.data.gears.push(value);
      } else {
        state.data.gears.splice(index, 1, value);
      }
      persistenceService.save(value);
    },
    removeGear(state: any, value: Gear.Gear) {
      console.log('removeGear::value = ', value);
      if (value && value.id) {
        const index = state.data.gears.findIndex((x: Gear.Gear) => x.id == value.id);
        if (index >= 0) {
          state.data.gears.splice(index, 1);
        }
        persistenceService.remove(value);
      }
    },
    saveProfile(state, profile: OptimizationProfile) {
      if (profile.heroId) {
        // TODO: better deep clone solution
        const shadow = JSON.parse(JSON.stringify(profile)) as OptimizationProfile;
        const index = state.data.profiles.findIndex(x => x.heroId == shadow.heroId);
        if (index < 0) {
          state.data.profiles.push(shadow);
        } else {
          state.data.profiles.splice(index, 1, shadow);
        }
      }
    },
    replaceHeros: (state, heros: Hero[]) => {
      state.data.heros = heros;
      persistenceService.replaceAll(heros);
    },
    //
    restoreData(state: any, value: VuexData) {
      Vue.set(state, 'data', value);
    }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    },
    saveGears: ({ commit }, gears: Array<Gear.Gear>) => {
      if (gears && gears.length > 0) {
        gears.forEach(gear => commit('saveGear', gear));
      }
    },
    removeGears: ({ commit }, gears: Gear.Gear[]) => {
      if (gears && gears.length > 0) {
        gears.forEach(gear => commit('removeGear', gear));
      }
    },
    updateProfiles: ({ commit }, profiles: OptimizationProfile[]) => {
      if (profiles && profiles.length > 0) {
        profiles.forEach(profile => commit('saveProfile', profile));
      }
    },
    // initialization
    initVuex: ({ commit, dispatch }, data: VuexData) => {
      console.log('initVuex::start, data =', data);
      commit('restoreData', data);
      if (data.heros.length == 0) {
        dispatch('refreshHeros');
      }
    },
    refreshHeros: async ({ commit, dispatch, state }) => {
      dispatch('withLoading', async () => {
        console.log('refreshHeros::start');
        const heros = await E7dbDataHandler.retrieveHeros();
        console.log('refreshHeros::heros.length =', heros.length);
        commit('replaceHeros', heros);
      });
    }
  },
  modules: {}
});
