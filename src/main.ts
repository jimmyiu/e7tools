import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
//
import '@/filters';
import '@/assets/css/global.sass';
//
Vue.config.productionTip = false;
//
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
