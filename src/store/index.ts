import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    loading(state: any, value) {
      state.loading = value;
    }
  },
  actions: {
    withLoading: ({ commit }, fn: () => Promise<any>) => {
      new Promise(resolve => {
        commit('loading', true);
        fn().then(p => commit('loading', false));
      });
    }
    // toggleMenu: ({ commit, state }) => {
    //   commit('menu', !state.menu);
    // }
  },
  modules: {}
});
