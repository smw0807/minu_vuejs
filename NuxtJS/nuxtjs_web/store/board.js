export const state = () => {
  return {
    boardList: []
  }
};

export const mutations = {
  SET_BOARD_LIST(state, payload) {
    state.boardList = payload;
  }
}

export const getters = {
  GET_BOARD_LIST(state) {
    return state.boardList;
  }
}

export const actions = {
  initBoardList({ commit }) {
    this.$axios.get('/data/movies.json').then(rs => {
      commit('SET_BOARD_LIST', rs.data);
    });
  }
}