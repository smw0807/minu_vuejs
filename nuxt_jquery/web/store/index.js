export const strict = false;
export const state = () => {
  return {
    list: [],
    loading: false,
    filters:[
      { mode: 'include', type: 'direct', field:'name', name: '이름', data: '민우' },
      { mode: 'exclude', type: 'indirect', field:'name', name: '이름', data: '송민우' },
      { mode: 'exclude', type: 'direct', field:'name', name: '이름', data: '민우5' },
      { mode: 'include', type: 'indirect', field:'test_port', name: '포트', data: '8201' },
      { mode: 'exclude', type: 'indirect', field:'age', name: '나이', data: '30' },
    ],
    context_menu: {
      type:'string',
      text:'',
      info: {}
    },
    alert : false,
    alert_data: {
      type: 'primary', //type은 success, info, warning, error 이렇게 4가지를 쓸 수 있음
      title: '',
      text: ''
    },
  }
};

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_FILTERS(state, payload) {
    state.filters = payload;
  },
  SET_CONTEXT_MENU(state, payload) {
    state.context_menu = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ALERT(state, payload) {
    state.alert = payload.alert;
      state.alert_data.title = payload.title === (null || undefined || '') ? '' : payload.title;
      state.alert_data.type = payload.type;
      state.alert_data.text = payload.text;
  },
}

export const getters = {
  GET_LIST(state) {
    return state.list;
  },
  GET_FILTERS(state) {
    return state.filters;
  },
  GET_CONTEXT_MENU(state) {
    return state.context_menu;
  },
  GET_LOADING(state) {
    return state.loading;
  },
  GET_ALERT(state) {
    return state.alert;
  },
  GET_ALERT_DATA(state) {
    return state.alert_data;
  },
}

export const actions = {
  test() {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/api_test');
        console.log('test : ', rs);
      } catch (err) {
        console.error('Error : ', err);
      }
    });
  },
  initList({commit}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/test/list', params);
        commit('SET_LIST', rs.data.data);
        resolve(rs);
      } catch (err) {
        console.error('store/initList err : ', err);
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