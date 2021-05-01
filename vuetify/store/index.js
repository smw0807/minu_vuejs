export const state = () => {
  return {
    loading_1: false,
    loading_2: false,
    loading_3: false,
    loading_4: false,
    loading_5: false,
    alert : false,
    alert_data: {
      type: 'primary', //type은 success, info, warning, error 이렇게 4가지를 쓸 수 있음
      text: ''
    },
    confirm : false,
    confrim_data: {
      rs: false,
      type: 'primary',
      text: ''
    },
    overlay: false
  }
};

export const mutations = {
  SET_LOADING(state, payload) {
    const key = Object.keys(payload);
    state[key] = payload[key];
  },
  SET_ALERT(state, payload) {
    state.alert = payload.alert;
    state.alert_data.type = payload.type;
    state.alert_data.text = payload.text;
  },
  SET_OVERLAY(state, payload) {
    state.overlay = payload;
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
  },
  GET_ALERT(state) {
    return state.alert;
  },
  GET_ALERT_DATA(state) {
    return state.alert_data;
  },
  GET_OVERLAY(state) {
    return state.overlay;
  }
}

export const actions = {
  updateLoading({commit}, params) {
    commit('SET_LOADING', params);
  },
  updateAlert({commit}, params) {
    commit('SET_ALERT', params);
  },
  updateOverlay({commit}, params) {
    commit('SET_OVERLAY', params);
  }
}