import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();

import axios from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    needLogin: false,
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    needLogin(state, data) {
      state.needLogin = data;
    },
    accessToken(state, data) {
      state.accessToken = data;
    },
    refreshToken(state, data) {
      state.refreshToken = data;
    }
  },
  getters: {
    needLogin(state) {
      return state.needLogin;
    },
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    }
  },
  actions: {
    login({commit}, params) {
      return new Promise( async(resolve, reject) => {
        //로그인 후 토큰 처리
        try {
          const rs = await axios.post('/api/auth/login', params);
          if (rs.data.ok) {
            commit('needLogin', false);
            cookies.set('accessToken', rs.data.result.accessToken);
            cookies.set('refreshToken', rs.data.result.refreshToken);
          }
          resolve(rs.data.msg);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    },
    refreshToken() {
      return new Promise( async(resolve, reject) => {
        //토큰 재발급
      })
    },
    checkToken() {
      return new Promise( async(resolve, reject) => {
        //토큰 체크?
      })
    },
  }
}