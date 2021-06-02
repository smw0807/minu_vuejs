export const state = () => {
  return {
    list: []
  }
};

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
}

export const getters = {
  GET_LIST(state) {
    return state.list;
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
        console.log(rs);
        resolve(rs);
      } catch (err) {
        console.error('store/initList err : ', err);
        reject(err);
      }
    })
  }
}