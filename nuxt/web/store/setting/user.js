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
        let rs = await this.$axios.post('/api/es/setting/user/list');
        console.log('response', rs);
      } catch (err) {
        console.log('initUserList Error', err);
        reject(err);
      }
    })
  },
  insertUser({ commit }, params) {

  },
  updateUser({ commit }, params) {

  },
  deleteUser({ commit }, params) {
    
  }
}