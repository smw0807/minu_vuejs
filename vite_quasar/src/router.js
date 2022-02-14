import { createWebHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('./views/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;