export const test = {
  namespaces: true,
  state: {
    test: 'tttttt'
  },
  mutations: {
    SET_TEST(state, payload) {
      state.test = payload;
    }
  },
  getters: {
    GET_TEST(state) {
      return state.test;
    }
  }
}