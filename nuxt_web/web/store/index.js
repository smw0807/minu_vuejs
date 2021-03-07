// import cookie from 'vue-cookies';
import cookie from 'js-cookie';
const test = false;
export const state = () => {
  return {
    accessToken: null,
    refreshToken: null
  }
};

export const mutations = {
  loginToken(state, payload) {
    cookie.set('accessToken', payload.accessToken, '60s');
    cookie.set('refreshToken', payload.refreshToken, '1h');
    // cookie.set('accessToken', payload.accessToken, '60s');
    // cookie.set('refreshToken', payload.refreshToken, '1h');
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  refreshToken(state, payload) { //accessToken 재셋팅
    cookie.set('accessToken', payload.accessToken, '60s');
    cookie.set('refreshToken', payload.refreshToken, '1h');
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  removeToken() {
    cookie.remove('accessToken');
    cookie.remove('refreshToken');
    state.accessToken = null;
    state.refreshToken = null;
  }
};

export const getters = {
  getToken(state) {
    let ac = cookie.get('accessToken');
    let rf = cookie.get('refreshToken');
    return {
      access: ac,
      refresh: rf
    };
  }
};

export const actions = {
  login: function ({ commit }, params) {
    if (test) {
      let test = {
        accessToken : 'testTOKENtestestest',
        refreshToken : 'testTOKENtestestest'
      }
      commit('loginToken', test);
    } else {
      return new Promise((resove, reject) => {
        this.$axios.post('/v1/auth/login', params).then(res => {
          commit('loginToken', res.data.auth_info);
          resove(res);
        })
          .catch(err => {
            console.log(err.message);
            reject(err.message);
          });
      })
    }
  },
  refreshToken: function ({ commit }) { // accessToken 재요청
    //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
    if (test) {
      let test = {
        accessToken : 'testTOKENtestestest',
        refreshToken : 'testTOKENtestestest'
      }
      commit('refreshToken', test);
    } else {
      return new Promise((resolve, reject) => {
        this.$axios.post('/v1/auth/certify').then(res => {
          commit('refreshToken', res.data.auth_info);
          resolve(res.data.auth_info);
        }).catch(err => {
          console.log('refreshToken error : ', err);
          reject(err);
        })
      })
    }
  },
  logout: ({ commit }) => { // 로그아웃
    commit('removeToken');
    location.reload();
  }
}