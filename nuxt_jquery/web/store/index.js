export const strict = false;
export const state = () => {
  return {
    list: [],
    filters:[
      { type: 'include', mode: 'direct', field:'name', text: '이름', data: '민우' },
      { type: 'exclude', mode: 'indirect', field:'name', text: '이름', data: '송민우' },
      { type: 'exclude', mode: 'direct', field:'name', text: '이름', data: '민우5' },
      { type: 'include', mode: 'indirect', field:'test_port', text: '포트', data: '8201' },
      { type: 'exclude', mode: 'indirect', field:'age', text: '나이', data: '30' },
    ],
    context_menu: {
      type:'string',
      text:'',
      info: {}
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
  }
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
  }
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
  }
}