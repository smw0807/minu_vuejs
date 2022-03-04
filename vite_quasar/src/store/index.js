import { createStore } from 'vuex'

import tmp from './tmp/test'

const store = createStore({
  state: {
    rootState: 'aaa'
  },
  mutations:{
    rootState(state, payload) {
      state.rootState = payload;
    }
  },
  getters: {
    rootState(state) {
      return state.rootState;
    }
  },
  modules: {
    tmp
  }
})

export default store;