//route dir
//vue-router 설치해야함!!!
import Vue from 'vue';
import VueRouter from 'vue-router'

import main from '@/views/index'

Vue.use(VueRouter);

//라우터 정보 입력
const routes = [
  {
    path: '/test',
    name: 'main',
    component: main
  }
]
console.log('111');
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router