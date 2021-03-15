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
  {
    path: '/gear',
    name: 'gear',
    component: () => import(/* webpackChunkName: "gear" */ '../views/GearPage.vue')
  },
  {
    path: '/optimizer',
    name: 'optimizer',
    component: () => import(/* webpackChunkName: "gear" */ '../views/OptimizerPage.vue')
  },
  {
    path: '/import',
    name: 'import',
    component: () => import(/* webpackChunkName: "other" */ '../views/ImportPage.vue')
  },
  {
    path: '/hero',
    name: 'hero',
    component: () => import(/* webpackChunkName: "other" */ '../views/HeroPage.vue')
  },
  {
    path: '/other',
    name: 'other',
    component: () => import(/* webpackChunkName: "other" */ '../views/OtherPage.vue')
  }

  // {
  //   path: '/dev',
  //   name: 'dev',
  //   component: () => import(/* webpackChunkName: "gear" */ '../views/DevPage.vue')
  // }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
