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
  initList({commit, dispatch }, params) {
    console.log(params);
    return new Promise( async (resolve, reject) => {
      let q = {
        size: params.size,
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
        console.log('rs : ', rs);
        if (rs && rs.data.error === false) {
          commit('SET_LIST', rs.data.data);
          resolve(rs.data);
        } else {
          dispatch('updateAlert', {alert: true, type: 'error', text: rs.data.msg}, {root: true});
          reject(rs);
        }
      } catch (err) {
        console.error('monitoring list err : ', err);
        reject(err);
      }
    })
  }
}