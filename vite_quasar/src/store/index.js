import { createStore } from 'vuex'

import tmp from './tmp/test'
import auth from './auth/auth'

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
    tmp,
    auth
  }
})

export default store;