export const state = () => {
  return {
    list: [],
    user_id: '',
    user_nm: '',
    user_pw: '',
    user_auth: '',
    user_desc: ''
  }
};

export const mutations = {
  SET_USER_LIST(state, payload) {
  },
  SET_USER(state, payload) {

  }
}

export const getters = {
  GET_USER_LIST(state) {
  },
  GET_USER(state) {
    
  }
}

export const actions = {
  initUserList({ commit }) {
  },
  insertUser({ commit }, params) {

  },
  updateUser({ commit }, params) {

  },
  deleteUser({ commit }, params) {
    
  }
}