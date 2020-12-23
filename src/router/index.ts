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
  },
  {
    path: '/import',
    name: 'import',
    component: () => import(/* webpackChunkName: "gear" */ '../views/ImportPage.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
