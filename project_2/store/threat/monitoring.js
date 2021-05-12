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
  initList({commit}, params) {
    return new Promise( async (resolve, reject) => {
      let q = {
        size: 5,
        query: {
          bool:{
            must: [
  
            ],
            must_not: [
  
            ]
          }
        },
        sort:{
          "snort.date_time":"desc", 
          "yara.date_time":"desc"
        }
      }
      try {
        const rs = await this.$axios.post('/api/v1/threat/list', q);
        if (rs && rs.data.error === false) {
          commit('SET_LIST', rs.data.data);
          resolve(rs.data);
        }
      } catch (err) {
        console.error('monitoring list err : ', err);
        resolve(err);
      }
    })
  }
}