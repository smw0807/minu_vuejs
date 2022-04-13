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
      console.log('store/auth/auth.js : ', params);
      return new Promise( async(resolve, reject) => {
        resolve(true);
        //로그인 후 토큰 처리
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