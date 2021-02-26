import axios from "axios";
import VueCookies from 'vue-cookies';
//로그인 처리 관련 저장소 모듈
export const login = {
    state: {
        host: 'http://192.168.1.29:3000',
        accessToken: null,
        refreshToken: null
    },
    mutations: {
        loginToken (state, payload) {
            VueCookies.set('accessToken', payload.accessToken, '60s');
            VueCookies.set('refreshToken', payload.refreshToken, '1h');
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
        },
        refreshToken(state, payload) { //accessToken 재셋팅
          VueCookies.set('accessToken', payload.accessToken, '60s');
          VueCookies.set('refreshToken', payload.refreshToken, '1h');
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
            console.log(err.message);
            reject(err.message);
          });
        })
      },
      refreshToken: ({commit}) => { // accessToken 재요청
        //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
        return new Promise((resolve, reject) => {
          axios.post('/v1/auth/certify').then(res => {
            commit('refreshToken', res.data.auth_info);
            resolve(res.data.auth_info);
          }).catch(err => {
            console.log('refreshToken error : ', err.config);
            reject(err.config.data);
          })
        })
      },
      logout: ({commit}) => { // 로그아웃
        commit('removeToken');
        location.reload();
      }
    }
}