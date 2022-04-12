import { createWebHistory, createRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();
// import { useStore } from 'vuex';
// const store = useStore();
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  console.log('router.js cookies : ', cookies.get("accessToken"));
  // console.log(store);
  // console.log(to, from);
  return next();
})

export default router;