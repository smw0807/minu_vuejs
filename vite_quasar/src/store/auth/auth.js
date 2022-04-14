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
    login({commit}, params) { //로그인 및 토큰 처리
      return new Promise( async(resolve, reject) => {
        try {
          const rs = await axios.post('/api/auth/login', params);
          if (rs.data.ok) {
            const access = rs.data.result.accessToken;
            const refresh = rs.data.result.refreshToken;
            cookies.set('accessToken', access, import.meta.env.VITE_ACCESS_TIME);
            cookies.set('refreshToken', rs.data.result.refreshToken, import.meta.env.VITE_REFRESH_TIME);
            commit('accessToken', access);
            commit('refreshToken', refresh);
            commit('needLogin', false);
          }
          resolve(rs.data.msg);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    },
    verifyToken({commit}) { //토큰 검증
      return new Promise( async(resolve, reject) => {
        try {
          const rs = await axios.post('/api/auth/accessTokenCheck');
          if(rs.data.ok) {
            resolve(true);
          } else {
            console.error(rs.data.msg);
            alert(rs.data.result);
            commit('needLogin', true);
            resolve(false);
          }
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    },
    refreshToken({commit}) { //토큰 재발급
      return new Promise( async(resolve, reject) => {
        try {
          const rs = await axios.post('/api/auth/refreshToken');
          if(rs.data.ok) {
            const access = rs.data.result.accessToken;
            const refresh = rs.data.result.refreshToken;
            cookies.set('accessToken', access, import.meta.env.VITE_ACCESS_TIME);
            cookies.set('refreshToken', rs.data.result.refreshToken, import.meta.env.VITE_REFRESH_TIME);
            commit('accessToken', access);
            commit('refreshToken', refresh);
            commit('needLogin', false);
            resolve(true);
          } else {
            console.error(rs.data.msg);
            alert(rs.data.result);
            commit('needLogin', true);
            resolve(false);
          }
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    },
  }
}