import { App } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name: 'Home',
    component: () => import('../views/index.vue')
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('../views/icon.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

//router 적용
export function setupRouter(app: App) {
  app.use(router);
}