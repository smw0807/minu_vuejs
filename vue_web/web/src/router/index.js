import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

import { store } from '@/store/store'

import Login from '@/components/Login'

import Main from '@/view/Main'
import Board1 from '@/view/Board1'
import Board2 from '@/view/Board2'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/board1',
    name: 'Board1',
    component: Board1
  },
  {
    path: '/board2',
    name: 'Board2',
    component: Board2
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];
const router = new VueRouter({
  mode: 'history',
  routes
})
//네비게이션 가드((뷰 라우터로 URL 접근에 대해서 처리할 수 있음)
router.beforeEach( async(to, from, next) => { //여기서 모든 라우팅이 대기 상태가 됨
  /**
   * to: 이동할 url 정보가 담긴 라우터 객체
   * from: 현재 url 정보가 담긴 라우터 객체
   * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
   * next() 가 호출되기 전까지 화면 전환되지 않음
   */
  if(VueCookies.get('accessToken')===null && VueCookies.get('refreshToken') !== null){
    //refreshToken은 있고 accessToken이 없을 경우 토큰 재발급 요청
    await store.dispatch('refreshToken');
  }
  if (VueCookies.get('accessToken')!==null){
    //accessToken이 있을 경우 진행
    return next();
  }
  //둘다 없을 경우에는 여기서 요청을 너무 때려서 주석처리하고 App.uve에다가 created 훅에다가 추가함
  // if(VueCookies.get('accessToken')===null && VueCookies.get('refreshToken') === null){
  //   //2개 토큰이 모두 없을 경우 로그인페이지로
  //   return next({name: 'Login'});
  // }
  return next();
})

export default router