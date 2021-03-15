import Vue from 'vue';
import Vuex from 'vuex';
import { VuexData, Gear, Hero, OptimizationProfile, SiteState, HeroAbility } from '@/models';
import E7dbDataHandler from '@/services/e7db-data-handler';
import { persistenceService } from '@/services/presistence';
import { ConstantService, HeroService, ObjectUtils, SuitBuilder } from '@/services';
import { HeroSuit } from '@/models/suit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    data: {
      gears: [],
      // TODO: should NOT use vuex to store profile
      profiles: [],
      heros: [],
      suits: [],
      state: {
        lastSelectedHeroId: ''
      }
    } as VuexData
  },
  getters: {
    gears: state => {
      return state.data.gears;
    },
    heros: state => {
      return state.data.heros;
    },
    siteState: state => {
      return state.data.state;
    },
    getGear: state => (gearId: string) => {
      return state.data.gears.find(x => x.id == gearId);
    },
    getProfile: state => (heroId: string) => {
      return state.data.profiles.find(x => x.hero.id == heroId);
    },
    getHero: state => (heroId: string) => {
      return state.data.heros.find(x => x.id == heroId);
    },
    getEquippedHero: (state, getters) => (heroId: string) => {
      const hero: Hero = getters.getHero(heroId);
      if (hero) {
        const builder = new SuitBuilder();
        if (hero && hero.bonusAbility) {
          builder.bonus(hero.bonusAbility);
        }
        state.data.gears.filter(x => x.equippedHero == heroId).forEach(x => builder.setGear(x));
        return HeroService.equip(hero, builder.build());
      }
      return undefined;
    },
    getSavedSuit: (state, getters) => (heroId: string) => {
      const heroSuit = state.data.suits.find(x => x.heroSuitId == heroId);
      const hero: Hero = getters.getHero(heroId);
      const builder = new SuitBuilder();
      if (hero) {
        builder.bonus(hero.bonusAbility);
      }
      if (heroSuit) {
        [
          heroSuit.weaponId,
          heroSuit.armorId,
          heroSuit.helmetId,
          heroSuit.necklaceId,
          heroSuit.ringId,
          heroSuit.bootId
        ].forEach(x => {
          if (x) {
            const gear = getters.getGear(x);
            if (gear) {
              builder.setGear(gear);
            }
          }
        });
      }
      return builder.build();
    }
  },
  mutations: {
    loading(state: any, value) {
      state.loading = value;
    },
    state: (state, siteState: Partial<SiteState>) => {
      Object.assign(state.data.state, siteState);
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
      if (profile.hero.id) {
        // TODO: better deep clone solution
        const shadow = JSON.parse(JSON.stringify(profile)) as OptimizationProfile;
        const index = state.data.profiles.findIndex(x => x.hero.id == shadow.hero.id);
        if (index < 0) {
          state.data.profiles.push(shadow);
        } else {
          state.data.profiles.splice(index, 1, shadow);
        }
        persistenceService.save(shadow);
      }
    },
    saveHero: (state, hero: Hero) => {
      console.log('saveHero::hero = ', hero);
      const index = state.data.heros.findIndex(x => x.id == hero.id);
      if (index < 0) {
        throw new Error('Not able to insert new hero now');
      } else {
        const shadow = ConstantService.emptyHero();
        ObjectUtils.assignHero(shadow, hero);
        state.data.heros.splice(index, 1, shadow);
        persistenceService.save(shadow);
      }
    },
    replaceHeros: (state, heros: Hero[]) => {
      state.data.heros = heros;
      persistenceService.replaceAll(heros);
    },
    replaceSuits: (state, suits: HeroSuit[]) => {
      state.data.suits.splice(0, state.data.suits.length, ...suits);
      persistenceService.replaceAll(suits);
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
    saveHeros: ({ commit }, heros: Hero[]) => {
      if (heros && heros.length > 0) {
        heros.forEach(hero => commit('saveHero', hero));
      }
    },
    updateState: ({ commit }, siteState: Partial<SiteState>) => {
      commit('state', siteState);
    },
    // initialization
    initVuex: ({ commit, dispatch }, data: VuexData) => {
      console.log('initVuex::start, data =', data);
      commit('restoreData', data);
      if (data.heros.length == 0) {
        dispatch('refreshHeros');
      }
    },
    replaceSuits: ({ commit }, suits: HeroSuit[]) => {
      commit('replaceSuits', suits);
    },
    refreshHeros: async ({ commit, dispatch, state }) => {
      dispatch('withLoading', async () => {
        console.log('refreshHeros::start');
        const newHeros = await E7dbDataHandler.retrieveHeros();
        console.log('refreshHeros::heros.length =', newHeros.length);
        const heros = [...state.data.heros];
        newHeros.forEach(x => {
          if (heros.findIndex(h => h.id == x.id) < 0) {
            heros.push(x);
          }
        });
        commit('replaceHeros', heros);
      });
    }
  },
  modules: {}
});
