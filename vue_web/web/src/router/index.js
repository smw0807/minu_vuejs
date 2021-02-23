import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

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
  // base: process.env.BASE_URL,
  routes
})

// router.beforeEach( (to, from, next) => {
  // console.log(to);
  //assessToken 재발급
  // if(VueCookies.get('accessToken')===null && VueCookies.get('refreshToken') !== null){
  //   await refreshToken();
  //   return next();
  // }
  // if(VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') === null){
    // alert('로그아웃되었습니다.\n로그인해주시기 바랍니다.')
    // return next('/login');
  //   next('/login');
  // } else {
  //   next();
  // }
  // if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('accessToken')){
  //   console.log("??");
    // return next();
  // }
    // return next('/login');
// })
export default router