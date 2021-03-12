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
    return state.list; //state에 저장된 리스트를 반환
  }
};

export const actions = {
  initBoardList: function ({ commit }) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/api/v1/movies').then(res => {
        commit('SET_BOARD_LIST', res.data); //뮤테이션으로 트리거
        resolve(res.data);
      })
      .catch(err => {
        console.log('board list error');
        console.log(err);
        reject(err);
      })
    })
  }
};