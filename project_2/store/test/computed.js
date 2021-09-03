export const state = () => {
  return {
    count_1 : 0,
    count_2 : 0
  }
}

export const mutations = {
  SET_COUNT_1(state, payload) {
    state.count_1 = payload;
  },
  SET_COUNT_2(state, payload) {
    state.count_2 = payload;
  }
}

export const getters = {
  GET_COUNT_1(state) {
    return state.count_1;
  },
  GET_COUNT_2(state) {
    return state.count_2;
  }
}