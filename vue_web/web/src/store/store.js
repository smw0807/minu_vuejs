//상태관리 영역
import Vue from 'vue'
import Vuex from 'vuex'

import { login } from './module/login'; //로그인 모듈
import { board } from './module/board'; //게시판 모듈

Vue.use(Vuex) //vue에 Vuex를 설정

export const store = new Vuex.Store({
  modules: {
    login,
    board
  }
})