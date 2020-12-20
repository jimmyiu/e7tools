import colors from 'vuetify/lib/util/colors';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Vuex from 'vuex';

Vue.use(Vuetify);
Vue.use(Vuex);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    dark: true,
    themes: {
      light: {
        section: colors.grey.lighten3
      },
      dark: {
        section: colors.grey.darken3
      }
    },
    options: {}
  }
});
