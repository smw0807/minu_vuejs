export const state = () => {
  return {
    loading: true
  }
};

export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
}

export const getters = {
  GET_LOADING(state) {
    return state.loading;
  }
}

export const actions = {
  updateLoading({commit}, params) {
    commit('SET_LOADING', params);
  }
}