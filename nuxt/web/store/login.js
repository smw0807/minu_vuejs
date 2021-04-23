export const state = () => {
  return {
    accessToken: null,
    refreshToken: null
  }
}

export const mutations = {
  SET_TOKEN(state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  }
}

export const getters = {
  GET_TOKEN(state) {
    return state
  }
}

export const actions = {
  login({commit}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const idCheck = await this.$axios.post(`/api/es/login/login/${params.user_id}`);
        console.log(idCheck);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  },
  refreshToken({commit}, params) {

  }
}