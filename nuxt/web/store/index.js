export const state = () => {
  return {
    loading_1: false,
    loading_2: false,
    loading_3: false,
    loading_4: false,
    loading_5: false
  }
};

export const mutations = {
  SET_LOADING(state, payload) {
    const key = Object.keys(payload);
    state[key] = payload[key];
  }
}

export const getters = {
  GET_LOADING_1(state) {
    return state.loading_1;
  },
  GET_LOADING_2(state) {
    return state.loading_2;
  },
  GET_LOADING_3(state) {
    return state.loading_3;
  },
  GET_LOADING_4(state) {
    return state.loading_4;
  },
  GET_LOADING_5(state) {
    return state.loading_5;
  }
}

export const actions = {
  updateLoading({commit}, params) {
    commit('SET_LOADING', params);
  }
}