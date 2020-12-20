import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  // {
  //   path: '/hero',
  //   name: 'hero',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/HeroPage.vue')
  // },
  {
    path: '/gear',
    name: 'gear',
    component: () => import(/* webpackChunkName: "gear" */ '../views/GearPage.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
