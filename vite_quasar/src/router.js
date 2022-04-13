import { createWebHistory, createRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();

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

export default function(store) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  router.beforeEach(async (to, from, next) => {
    if (import.meta.env.VITE_IS_LOGIN === 'Y') {
      const access = cookies.get('accessToken');
      const refresh = cookies.get('refreshToken');
      if (access === null && refresh !== null) {
        //accessToken 재발급 받기
      }
      if (access === null && refresh === null) {
        //로그인 하기
        console.warn('need login...');
        store.commit('auth/needLogin', true);
      }
      return next();
    } else {
      store.commit('auth/needLogin', false);
      return next()
    }
  })
  return router;
}