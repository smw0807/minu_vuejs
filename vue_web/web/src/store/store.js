//상태관리 영역
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      host: 'http://192.168.1.29:3000',
      accessToken: '',
      refreshToken: ''
  },
  mutations: {
      loginToken (state, payload) {
          console.log('loginToken');
          console.log(payload);
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
      },
      logout (state) {
          if (state.token) {
              state.token = '';
              console.log('Logout 됨');
          }
      },
      checkToken (state, payload) {
          console.log('checkToken');
          console.log(state);
          console.log(state.accessToken);
          console.log(state.refreshToken);
      }
    //   loginCheck: function (state) {
    //       axios.get(`${state.host}${gAction.login}`)
    //   }
  },
  actions: {
  },
  modules: {
  }
})