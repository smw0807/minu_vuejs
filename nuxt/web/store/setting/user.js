import els from '~/utils/elastic'
export const state = () => {
  return {
    list: [],
    user: {
      user_id: '',
      user_nm: '',
      user_pw: '',
      user_auth: '',
      user_desc: ''
    }
  }
};

export const mutations = {
  SET_USER_LIST(state, payload) {
    state.list = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
}

export const getters = {
  GET_USER_LIST(state) {
    return state.list;
  },
  GET_USER(state) {
    return state.user;
  }
}

export const actions = {
  initUserList({ commit, dispatch }) { //사용자 리스트
    commit('SET_USER_LIST', []); //리스트 처음에 한번 초기화
    //TODO : size에 대해서 생각해봐야함
    return new Promise( async (resolve, reject) => {
      try {
        let query = {
          "size": 5000,
          "query": {
            "bool": {
              "must": [
                { "term": { "type": "user" } }
              ]
            }
          },
          "sort":{ "user.user_upd_dt" : "desc" }
        }
        dispatch('updateLoading', true, {root: true}); //로딩 시작
        const rs = await this.$axios.post('/api/es/setting/user/list', {query: query});
        let userList = [];
        if (!rs.data.result.error) {
          userList = els.getSearchHits(rs.data.result);
          commit('SET_USER_LIST', userList);
        } else {
          commit('SET_USER_LIST', userList);
        }
        dispatch('updateLoading', false, {root: true}); //로딩 끝
      } catch (err) {
        console.error('initUserList Error', err);
        reject(err);
      }
    })
  },
  insertUser({dispatch, commit }, params) { //사용자 등록
    return new Promise(async (resolve, reject) => {
      try {
        dispatch('updateLoading', true, {root: true}); //로딩 시작
        const rs = await this.$axios.post('/api/es/setting/user/insertUser', params);
        dispatch('updateLoading', false, {root: true}); //로딩 끝
        resolve(rs);
      } catch (err) {
        console.error('insertUser Error : ', err);
        reject(err);
      }
    })
  },
  updateUser({dispatch, commit }, params) { //사용자 수정
    return new Promise(async (resolve, reject) => {
      try {
        dispatch('updateLoading', true, {root: true}); //로딩 시작
        const rs = await this.$axios.post('/api/es/setting/user/updateUser', params);
        dispatch('updateLoading', false, {root: true}); //로딩 끝
        resolve(rs);
      } catch (err) {
        console.error('updateUser Error : ', err);
        reject(err);
      }
    })
  },
  deleteUser({ commit }, params) { //사용자 삭제
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.post(`/api/es/setting/user/deleteUser/${params}`);
        resolve(rs);
      } catch (err) {
        console.error('deleteUser Error', err);
        reject(err);
      }
    })
  }
}