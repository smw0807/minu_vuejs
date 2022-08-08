import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name: 'Home',
    component: () => import('../views/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('../views/icon.vue'),
    meta: {
      transition: 'fade',
    },
  }
];

export default routes;