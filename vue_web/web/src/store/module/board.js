import axios from "axios";

export const board = { 
  state:{
    list: []
  },
  mutations: {
    SET_BOARD_LIST (state, list) {
      state.list = list;
    }
  },
  getters: {
    boardList(state) {
      return state.list;
    }
  },
  actions: {
    initBoardList: ({commit}) => {
      axios.get('/v1/movies').then(res => {
        commit('SET_BOARD_LIST', res.data);
      })
      .catch(err => {
        console.log('board list error');
        console.log(err);
      })
    }
  }

};