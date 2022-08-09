import { App } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import  routes from './routes.config';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return { // 페이지 이동시 맨 위로 부드럽게 이동
      top: 0,
      behavior: 'smooth',
    }
  }
})

//router 적용
export function setupRouter(app: App) {
  app.use(router);
}