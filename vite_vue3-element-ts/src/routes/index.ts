/**
 * vue router
 * 공식 홈페이지 : https://router.vuejs.org/
 */
import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.config';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export function setupRouter(app: App) {
  app.use(router);
}