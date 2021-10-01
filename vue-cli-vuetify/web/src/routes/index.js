//route dir
//vue-router 설치해야함!!!
import Vue from 'vue';
import VueRouter from 'vue-router'

import main from '@/views/index' //메인
import test1 from '@/views/test/test1' //라우트 테스트
import test2 from '@/views/test/test2' //데이터 송수신
import test3 from '@/views/test/test3' //axios proxy 테스트

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
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2
  },
  {
    path: '/test3',
    name: 'test3',
    component: test3
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router