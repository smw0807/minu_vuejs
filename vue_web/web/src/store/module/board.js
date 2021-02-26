import axios from "axios";
//게시판 처리 관련 저장소 모듈
export const board = { 
  state:{
    list: []
  },
  mutations: {
    SET_BOARD_LIST (state, list) { //state에 저장
      state.list = list;
    }
  },
  getters: {
    boardList(state) {
      return state.list; //state에 저장된 리스트 전달
    }
  },
  actions: {
    initBoardList: ({commit}) => { //게시판 리스트 불러오기
      axios.get('/v1/movies').then(res => {
        commit('SET_BOARD_LIST', res.data); //뮤테이션으로 트리거
      })
      .catch(err => {
        console.log('board list error');
        console.log(err);
      })
    }
  }

};