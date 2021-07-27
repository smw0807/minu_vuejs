export const strict = false;
export const state = () => {
  return {
    config: {},
    api_test: '',
    es_test: '',
    loading_1: false,
    loading_2: false,
    loading_3: false,
    menuHistory: [],
    alert : false,
    alert_data: {
      type: 'primary', //type은 success, info, warning, error 이렇게 4가지를 쓸 수 있음
      text: ''
    },
  }
}

export const mutations = {
  SET_CONFIG(state, payload) {
    state.config = payload;
  },
  SET_API_TEST(state, payload) {
    state.api_test = payload;
  },
  SET_ES_TEST(state, payload) {
    state.es_test = payload;
  },
  SET_LOADING(state, payload) {
    const key = Object.keys(payload);
    state[key] = payload[key];
  },
  SET_ALERT(state, payload) {
    state.alert = payload.alert;
    state.alert_data.type = payload.type;
    state.alert_data.title = payload.title;
    state.alert_data.text = payload.text;
  },
  SET_MENU_HISTORY(state, payload) {
    state.menuHistory = payload;
  },
  SET_CONFIRM(state, payload) {
    state.confirm = payload;
  }
}

export const getters = {
  GET_CONFIG(state) {
    return state.config;
  },
  GET_API_TEST(state) {
    return state.api_test;
  },
  GET_ES_TEST(state) {
    return state.es_test;
  },
  GET_LOADING_1(state) {
    return state.loading_1;
  },
  GET_LOADING_2(state) {
    return state.loading_2;
  },
  GET_LOADING_3(state) {
    return state.loading_3;
  },
  GET_ALERT(state) {
    return state.alert;
  },
  GET_ALERT_DATA(state) {
    return state.alert_data;
  },
  GET_MENU_HISTORY(state) {
    return state.menuHistory;
  },
  GET_CONFIRM(state) {
    return state.confirm;
  },
  GET_CONFIRM_DATA(state) {
    return state.confirm_data;
  }
}

export const actions = {
  apitest({commit}) { //api 테스트 용
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/test');
        commit('SET_API_TEST', rs);
        resolve(rs);
      } catch (err) {
        console.error('apitest err : ' , err);
        reject(err);
      }
    })
  },
  elasticTest({commit}) { //ElasticSearch 연결 확인용
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/test/es_test');
        commit('SET_ES_TEST', rs);
        resolve(rs);
      } catch (err) {
        console.error('elasticTest err : ', err);
        reject(err);
      }
    })
  },
  updateLoading({commit}, params) {
    commit('SET_LOADING', params);
  },
  updateAlert({commit}, params) {
    commit('SET_ALERT', params);
  }
}