import Vue from 'vue'
// import Router from 'vue-router'
import VueRouter from 'vue-router';
import axios from 'axios';
import Main from '@/components/Main'
import Login from '@/components/Login'
import Board1 from '@/components/Board1'
import Board2 from '@/components/Board2'


import VueCookies from 'vue-cookies'

import { refreshToken } from '../service/login'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/board1'
  },
  {
    path: '*',
    name: 'any',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach( async(to, from, next) => {

//   if(VueCookies.get('accessToken')===null && VueCookies.get('refreshToken') !== null){
//     await refreshToken();
//   }

//   if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('accessToken')){
//     console.log("??");
//     return next();
//   }

//     // alert('로그인 해주세요');
//     return next('/login');
// })
export default router