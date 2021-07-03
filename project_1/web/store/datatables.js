const { sleep } = require('/utils/utils').default;
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
          commit('SET_LIST', rs.data.result);
          resolve(rs.data);
        } else {
          dispatch('updateAlert', {alert: true, type: 'error', title: 'ElasticSearch Error', text: rs.data.result}, {root: true});
          resolve(rs.data);
        }
        dispatch('updateLoading', {loading_1: false}, {root: true}); //로딩 끝
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }
}