import { createWebHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('./views/index.vue')
  },
  {
    path: '/composition',
    name: 'composition',
    component: () => import('./views/composition.vue')
  },
  {
    path: '/test-api',
    name: 'test-api',
    component: () => import('./views/api.vue')
  },
  {
    path: '/use-store',
    name: 'useStore',
    component: () => import('./views/use-store.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  // console.log(to, from);
  return next();
})

export default router;