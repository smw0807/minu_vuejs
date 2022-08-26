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
  {
    path: '/basic',
    name: 'Basic',
    // component: () => import('../views/basic/ep-button.vue'),
    meta: {
      transition: 'fade'
    },
    children: [
      {
        path: '/basic/button',
        name: 'Button',
        component: () => import('../views/basic/ep-button.vue'),
        meta: {
          transition: 'fade'
        },
      },
      {
        path: '/basic/border',
        name: 'Border',
        component: () => import('../views/basic/ep-border.vue'),
        meta: {
          transition: 'fade'
        },
      },
      {
        path: '/basic/layoutContainer',
        name: 'Layout Container',
        component: () => import('../views/basic/ep-layoutContainer.vue'),
        meta: {
          transition: 'fade'
        },
      },
      {
        path: '/basic/layout',
        name: 'Layout',
        component: () => import('../views/basic/ep-layout.vue'),
        meta: {
          transition: 'fade'
        },
      },
    ]
  }
];

export default routes;