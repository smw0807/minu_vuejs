export const state = () => {
  return {
    accessToken: null,
    refreshToken: null
  }
};

export const mutations = {
  loginToken(state, payload) {
    this.$cookiz.set('accessToken', payload.accessToken, {maxAge: 60});
    this.$cookiz.set('refreshToken', payload.refreshToken, {maxAge: 3600});
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  refreshToken(state, payload) { //accessToken 재셋팅
    this.$cookiz.set('accessToken', payload.accessToken, {maxAge: 60});
    this.$cookiz.set('refreshToken', payload.refreshToken, {maxAge: 3600});
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  removeToken() {
    this.$cookiz.remove('accessToken');
    this.$cookiz.remove('refreshToken');
    state.accessToken = null;
    state.refreshToken = null;
  }
};

export const getters = {
  getToken(state) {
    let ac = this.$cookiz.get('accessToken');
    let rf = this.$cookiz.get('refreshToken');
    return {
      access: ac,
      refresh: rf
    };
  }
};

export const actions = {
  login ({ commit }, params) {
    return new Promise( async (resove, reject) => {
      await this.$axios.post('/api/auth/login', params).then(res => {
        console.log(res);
        commit('loginToken', res.data.result);
        resove(res);
      })
      .catch(err => {
        console.log(err);
        reject(err.message);
      });
    })
  },
  refreshToken ({ commit, dispatch }) { // accessToken 재요청
    //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
    return new Promise(async (resolve, reject) => {
     await this.$axios.post('/api/auth/refreshToken').then(res => {
       console.log('refresh!!', res);
       if (res.status !== undefined) {
          if (res.status === 200) {
            let token = res.data.result;
            commit('refreshToken',token);
            resolve(token);
          } else {
           reject('false');
          }
        }
      })
      .catch(err => {
        console.log('refreshToken error : ', err);
        dispatch('logout');
        reject(err);
        
      })
    })
  },
  logout ({ commit, }) { // 로그아웃
    commit('removeToken');
  },
}