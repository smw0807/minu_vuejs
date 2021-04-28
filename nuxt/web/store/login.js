const  { salt_sha256 }  = require('~/utils/utils').default;

export const state = () => {
  return {
    accessToken: null,
    refreshToken: null
  }
}

export const mutations = {
  loginToken (state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    this.$cookiz.set('accessToken', payload.accessToken, {
      path: '/',
      maxAge: 60
    });
    this.$cookiz.set('refreshToken', payload.refreshToken, {
      path: '/',
      maxAge: 3600
    });
  },
  refreshToken(state, payload) {
    //accessToken 재셋팅
    console.log('refresh');
    this.$cookiz.set('accessToken', payload.accessToken, {
      path: '/',
      maxAge: 60
    });
    this.$cookiz.set('refreshToken', payload.refreshToken, {
      path: '/',
      maxAge: 3600
    });
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  removeToken(state) {
    console.log('remove');
    console.log(`access : ${this.$cookiz.get('accessToken')}`);
    console.log(`refresh : ${this.$cookiz.get('refreshToken')}`);
    this.$cookiz.remove('accessToken');
    this.$cookiz.remove('refreshToken');
    state.accessToken = null;
    state.refreshToken = null;
  }
}

export const getters = {
  getToken(state) {
    return {
      access: state.accessToken,
      refresh: state.refreshToken
    };
  }
}

export const actions = {
  login({commit, dispatch}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/es/login/login', params, { retry: true });
        console.log('store/login', rs);
        if (!rs.data.result.error) {
          const token = rs.data.result.auth_info;
          console.log(token);
          commit('loginToken', rs.data.result.auth_info);
          // console.log(this.$auth);
          // console.log(this.$auth.strategy);
          // console.log(this.$auth.strategies);
          // const a = await this.$auth.setUser(rs.data.result.user);
        }
        resolve(rs.data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  },
  refreshToken({ commit, dispatch }) {
    // accessToken 재요청
    //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          retry: true,
          headers: { 'x-refresh-token': this.$cookiz.get('refreshToken') }
        }
        const rs = await this.$axios.post('/api/es/login/certify',{}, options);
        console.log('refresh : ', rs);
        if (rs && rs.data.result.error !== false) {
          const token = res.data.result.auth_info;
          commit('refreshToken', token);
          resolve(token);
        } else {
          commit('removeToken');
          reject('failed');
        }
      } catch (err) {
        console.log('refreshToken error : ', err);
        commit('removeToken');
        reject(err);
      }
    });
  },
  logout({ commit }) {
    // 로그아웃
    commit('removeToken');
  }
}