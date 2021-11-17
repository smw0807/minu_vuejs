/** 작업자 : 송민우 */
const accessTokenValidity = process.env.NODE_ENV === 'development' ? 3600 * 24 * 7 : 3600 * 24;
const refreshTokenValidity = process.env.NODE_ENV === 'development' ? 3600 * 24 * 365 : 3600 * 24 * 7;
export const strict = false;
export const state = () => {
  return {
    theme: false,
    loading_1: false,
    loading_2: false,
    loading_3: false,
    loading_4: false,
    loading_5: false,
    loadingTheme : false, 
    show_menuHistory: true,
    menuHistory: [],
    alert: false,
    alert_data: {
      type: 'primary', //type은 success, info, warning, error 이렇게 4가지를 쓸 수 있음
      title: '',
      text: ''
    },
    asyncAlert: false,
    asyncAlert_data: {
      type: 'primary',
      title: '',
      text: ''
    },
    accessToken: null,
    refreshToken: null
  };
};

export const mutations = {
  SET_LOADING(state, payload) {
    const key = Object.keys(payload);
    state[key] = payload[key];
  },
  SET_LOADING_THEME(state, payload) {
    state.loadingTheme = payload.loadingTheme;
  },
  SET_ALERT(state, payload) {
    state.alert = payload.alert;
    state.alert_data.title = payload.title === (null || undefined || '') ? '' : payload.title;
    state.alert_data.type = payload.type;
    state.alert_data.text = payload.text;
  },
  SET_ASYNC_ALERT(state, payload) {
    state.asyncAlert = payload.alert;
    state.asyncAlert_data.title = payload.title === (null || undefined || '') ? '' : payload.title;
    state.asyncAlert_data.type = payload.type;
    state.asyncAlert_data.text = payload.text;
  },
  SET_SHOW_MENU_HISTORY(state, payload) {
    state.show_menuHistory = payload;
  },
  SET_MENU_HISTORY(state, payload) {
    state.menuHistory = payload;
  },
  SET_THEME(state, payload) {
    state.theme = payload;
  },
  loginToken(state, payload) {
    this.$cookiz.set('accessToken', payload.accessToken, {
      path: '/',
      maxAge: accessTokenValidity
    });
    this.$cookiz.set('refreshToken', payload.refreshToken, {
      path: '/',
      maxAge: refreshTokenValidity
    });
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  refreshToken(state, payload) {
    //accessToken 재셋팅
    // console.log('refresh token...');
    this.$cookiz.set('accessToken', payload.accessToken, {
      path: '/',
      maxAge: accessTokenValidity
    });
    this.$cookiz.set('refreshToken', payload.refreshToken, {
      path: '/',
      maxAge: refreshTokenValidity
    });
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
  removeToken(state) {
    console.log('remove token...');
    this.$cookiz.remove('accessToken');
    this.$cookiz.remove('refreshToken');
    state.accessToken = null;
    state.refreshToken = null;
  }
};

export const getters = {
  GET_LOADING_1(state) {
    return state.loading_1;
  },
  GET_LOADING_2(state) {
    return state.loading_2;
  },
  GET_LOADING_3(state) {
    return state.loading_3;
  },
  GET_LOADING_4(state) {
    return state.loading_4;
  },
  GET_LOADING_5(state) {
    return state.loading_5;
  },
  GET_LOADING_THEME(state){
    return state.loadingTheme;
  },
  GET_ALERT(state) {
    return state.alert;
  },
  GET_ALERT_DATA(state) {
    return state.alert_data;
  },
  GET_ASYNC_ALERT(state) {
    return state.asyncAlert;
  },
  GET_ASYNC_ALERT_DATA(state) {
    return state.asyncAlert_data;
  },
  GET_SHOW_MENU_HISTORY(state) {
    return state.show_menuHistory;
  },
  GET_MENU_HISTORY(state) {
    return state.menuHistory;
  },
  GET_THEME(state) {
    return state.theme;
  },
  getToken(state) {
    return {
      access: state.accessToken,
      refresh: state.refreshToken
    };
  }
};

export const actions = {
  updateLoading({ commit }, params) {
    commit('SET_LOADING', params);
  },
  loadingTheme({ commit }, params){
    commit('SET_LOADING_THEME', params);
  },
  updateAlert({ commit }, params) {
    commit('SET_ALERT', params);
  },
  updateAsyncAlert({ commit }, params) {
    console.log('updatedAsyncAlert 1', params);
    commit('SET_ASYNC_ALERT', params);
    console.log('updatedAsyncAlert 2');
    return new Promise (async (resolve, reject) => {
      console.log('updatedAsyncAlert 3', params);
      if (!params.alert) {
        resolve(true);
      }
    })
  },
  login({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      await this.$axios
        .post('/api/v1/auth/login', params, { retry: true })
        .then(res => {
          if (res.data) {
            commit('loginToken', res.data.auth_info);
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  refreshToken({ commit, dispatch }) {
    // accessToken 재요청
    //accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
    return new Promise(async (resolve, reject) => {
      await this.$axios
        .post(
          '/api/v1/auth/certify',
          {},
          {
            retry: true,
            headers: { 'x-refresh-token': this.$cookiz.get('refreshToken') }
          }
        )
        .then(res => {
          // console.log('refresh!!', res);
          if (res && 200 === res.status) {
            let token = res.data.auth_info;
            commit('refreshToken', token);
            resolve(token);
          } else {
            commit('removeToken');
            reject('failed');
          }
        })
        .catch(err => {
          console.log('refreshToken error : ', err);
          commit('removeToken');
          reject(err);
        });
    });
  },
  logout({ commit }) {
    // 로그아웃
    commit('removeToken');
  }
};
