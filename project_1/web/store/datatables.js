export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  }
}

export const getters = {
  GET_LIST(state) {
    return state.list;
  }
}

export const actions = {
  initList({commit, dispatch}, params) {
    return new Promise ( async (resolve, reject) => {
      try {
        dispatch('updateLoading', {loading_1: true}, {root: true}); //로딩 시작
        const rs = await this.$axios.post('/api/v1/vtable/list');
        if (rs && rs.data.error === false) {
          commit(rs.data.data);
          resolve(rs.data);
        } else {
          reject(rs.data);
        }
        dispatch('updateLoading', {loading_1: false}, {root: true}); //로딩 끝
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }
}