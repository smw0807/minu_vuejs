export default {
  namespaced: true, //이 옵션을 넣어야 tmp/getters 이런 식으로 사용 가능 안넣으면 이름 중첩조심해야함
  state: {
    framework: 'Vue3',
    webpack: 'Vite2',
    design: 'quasar'
  },
  mutations: {
    framework(state, data) {
      state.framework = data;
    }
  },
  getters: {
    framework(state) {
      return state.framework;
    }
  },
  actions:{
    framework({ commit }) {
      return new Promise((resolve, reject) => {
        resolve(true);
      })
    }
  }
}