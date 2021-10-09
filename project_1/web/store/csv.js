export const state = () => {
  return {
    list: [],
  }
}

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
  initList({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/csv/list', params);
        const data = rs.data.result;
        commit('SET_LIST', data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  },
  csvDownload({commit}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(params);
        const rs = await this.$axios.post('/api/v1/csv/download', params);
        console.log(rs);
        resolve(rs);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }
}