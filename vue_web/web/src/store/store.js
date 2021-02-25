//상태관리 영역
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueCookies from 'vue-cookies';

import { board } from './module/board';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      host: 'http://192.168.1.29:3000',
      accessToken: null,
      refreshToken: null
  },
  mutations: {
      loginToken (state, payload) {
          VueCookies.set('accessToken', payload.accessToken, '60s' );
          VueCookies.set('refreshToken', payload.refreshToken, '1h' );
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
      },
      refreshToken(state, payload) { //accessToken 재셋팅
        VueCookies.set('accessToken', payload, '60s' );
        state.accessToken = payload;
      },
      removeToken () {
        VueCookies.remove('accessToken');
        VueCookies.remove('refreshToken');
      },
  },
  getters: {
    //쿠키에 저장된 토큰 가져오기
    getToken (state) {
      let ac = VueCookies.get('accessToken');
      let rf = VueCookies.get('refreshToken');
      return {
        access: ac,
        refresh: rf
      };
    }
  },
  actions: {
    login: ({commit}, params) => {
      return new Promise((resove, reject) => {
        axios.post('/v1/auth/login', params).then(res => {
          commit('loginToken', res.data.auth_info);
          resove(res);
        })
        .catch(err => {
          reject(err);
        });
      })
    },
    refreshToken: ({commit}) => { // accessToken 재요청
      return new Promise((resolve, reject) => {
        axios.post('/v1/auth/certify').then(res => {
          commit('refreshToken', res.data.auth_info.accessToken);
          resolve(res.data.auth_info);
        }).catch(err => {
          console.log('refreshToken error : ', err);
          reject(err);
        })
      })
    },
    logout: ({commit}) => { // 로그아웃
      commit('removeToken');
      location.reload();
    }
  },
  modules: {
    board
  }
})