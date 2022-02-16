import { createStore } from 'vuex'

import tmp from './tmp/test'

const store = createStore({
  state: {
    rootState: 'aaa'
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