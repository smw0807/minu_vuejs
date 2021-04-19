import els from '~/utils/elastic'
export const state = () => {
  return {
    list: [],
    user: {
      user_id: '',
      user_nm: '',
      user_pw: '',
      user_auth: '',
      user_desc: ''
    }
  }
};

export const mutations = {
  SET_USER_LIST(state, payload) {
    state.list = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
}

export const getters = {
  GET_USER_LIST(state) {
    return state.list;
  },
  GET_USER(state) {
    return state.user;
  }
}

export const actions = {
  initUserList({ commit }) {
    return new Promise( async (resolve, reject) => {
      try {
        let query = {
          "query": {
            "bool": {
              "must": [
                { "term": { "type": "user" } }
              ]
            }
          }
        }
        const rs = await this.$axios.post('/api/es/setting/user/list', {query: query});

        let userList = [];
        if (!rs.data.result.error) {
          userList = els.getSearchHits(rs.data.result);
          commit('SET_USER_LIST', userList);
        } else {
          commit('SET_USER_LIST', userList);
        }
      } catch (err) {
        console.error('initUserList Error', err);
        reject(err);
      }
    })
  },
  insertUser({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/es/setting/user/insertUser', params);
        resolve(rs);
      } catch (err) {
        console.error('insertUser Error : ', err);
        reject(err);
      }
    })
  },
  updateUser({ commit }, params) {

  },
  deleteUser({ commit }, params) {
    
  }
}