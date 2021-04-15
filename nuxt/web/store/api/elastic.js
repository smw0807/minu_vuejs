//엘라스틱 현재 연결 상태 저장할 저장소

export const state = () => {
  return {
    is_connect : false
  }
}

export const mutations = {
  SET_ES_CONNECT(state, payload) {
    state.is_connect;
  }
}

export const getters = {
  GET_ES_CONNECT(state) {
    return state.is_connect;
  }
}

export const actions = {
  esConnect({commit}) {
    return new Promise( async (resolve, reject) => {
      
    })
  }
}