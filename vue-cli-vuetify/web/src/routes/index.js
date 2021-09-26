//route dir
//vue-router 설치해야함!!!
import Vue from 'vue';
import VueRouter from 'vue-router'

import main from '@/views/index'
import test1 from '@/views/test/test1'

Vue.use(VueRouter);

//라우터 정보 입력
const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router