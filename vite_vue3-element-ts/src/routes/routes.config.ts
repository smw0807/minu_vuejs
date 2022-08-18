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
    path:'/test',
    name: 'Test',
    component: () => import('../views/test/test.vue'),
    meta: {
      transition: 'fade',
    },
  },
];

export default routes;