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
      // @@ 토큰 변조를 할 수 있으니 토큰이 있을 경우 검증은 어떤 경우에??

      //@@ accessToken 만 있을 경우 재발급 받기
      if (access === null && refresh !== null) {
      }

      //@@ refreshToken이 없을 경우 로그인 창 띄우기
      if (refresh === null) {
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