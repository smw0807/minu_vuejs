//상태관리 영역
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';
import VueCookies from 'vue-cookies';

import { board } from './module/board';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      host: 'http://192.168.1.29:3000',
      isLogin: false
      // accessToken: '',
      // refreshToken: ''
  },
  mutations: {
      loginToken (state, payload) {
          // state.accessToken = payload.accessToken;
          // state.refreshToken = payload.refreshToken;
          VueCookies.set('accessToken', payload.accessToken, '60s' );
          VueCookies.set('refreshToken', payload.refreshToken, '1h' );
          state.isLogin = true;
      },
      refreshToken(state, payload) {
        // accessToken 재요청
        console.log("refreshToken");
        // this.$Axios.post('/auth').then(res => {
        //   console.log(state);
        //   console.log(res);
        // }).catch(err =>{
        //   console.log(err);
        // })
      },
      logout () {
        VueCookies.remove('accessToken');
        VueCookies.remove('refreshToken');
        location.reload();
      },
  },
  getters: {
    //쿠키에 저장된 토큰 가져오기
    getToken (state) {
      // console.log('getToken');
      let ac = VueCookies.get('accessToken');
      let rf = VueCookies.get('refreshToken');
      let host = state.host;
      // console.log(ac);
      // console.log(rf);
      return {
        access: ac,
        refresh: rf,
        host: host
      };
    }
  },
  actions: {
  },
  modules: {
    board
  }
})