//게시판 저장소 묘듈
export const state = () => ({
  list: []
});

export const mutations = {
  SET_BOARD_LIST(state, list) {
    state.list = list;
  }
};

export const getters = {
  boardList(state) {
    console.log('getters');
    console.log(state.list);
    return state.list; //state에 저장된 리스트를 반환
  }
};

export const actions = {
  initBoardList: function ({ commit }) {
    this.$axios.get('/v1/movies').then(res => {
      console.log('initBoardList');
      console.log(res);
      commit('SET_BOARD_LIST', res.data); //뮤테이션으로 트리거
    })
    .catch(err => {
      console.log('board list error');
      console.log(err);
    })
  }
};