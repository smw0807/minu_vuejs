export const state = () => {
  return {
    ping: false,
    node_infos: [],
    idx_infos: [],
  }
}

export const mutations = {
  SET_PING(state, payload) {
    state.ping = payload;
  },
  SET_NODE(state, payload) {
    state.node_infos = payload;
  },
  SET_IDX(state, payload) {
    state.idx_infos = payload;
  }
}

export const getters = {
  GET_PING(state) {
    return state.ping;
  },
  GET_NODE(state) {
    return state.node_infos;
  },
  GET_IDX(state) {
    return state.idx_infos;
  },
}

export const actions = {
  elsPingCheck( {commit} ) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/els/es_ping');
        if (!rs.data.error) {
          commit('SET_PING', rs.data.result);
        } else {
          console.log(rs.data.result);
          commit('SET_PING', false);
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  },
  getNodeInfos( {commit} ) {
    return new Promise ( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/els/els_node_infos');
        if (!rs.data.error) {
          commit('SET_NODE', rs.data.result);
        } else {
          commit('SET_NODE', []);
        }
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  },
  getIdxInfos( {commit} ) {
    return new Promise ( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/els/els_idx_infos');
        if (!rs.data.error) {
          commit('SET_IDX', rs.data.result);
        } else {
          commit('SET_IDX', []);
        }
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}