import { App } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import  routes from './routes.config';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

//router 적용
export function setupRouter(app: App) {
  app.use(router);
}