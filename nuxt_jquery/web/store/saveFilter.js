/** 작업자 : 송민우 */
export const state = () => {
  return {
    detail: {}, //상세정보
    save_filter_list: [], //저장된 검색조건 리스트
  }
}

export const mutations = {
  SET_DETAIL(state, payload) {
    state.detail = payload;
  },
  SET_FILTER_LIST(state, payload) {
    state.save_filter_list = payload;
  },
}

export const getters = {
  GET_DETAIL(state) {
    return state.detail;
  },
  GET_FILTER_LIST(state) {
    return state.save_filter_list;
  },
}

export const actions = {
  //검색조건 리스트 불러오기
  filterList({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        dispatch('updateLoading', {loading_1: true}, {root: true});
        const rs = await this.$axios.post('/api/v1/threat/filter_list', params);
        if (rs && rs.data.error === false) {
          commit('SET_FILTER_LIST', rs.data.data);
          resolve(rs.data);
        } else {
          dispatch('updateAlert', {alert: true, type: 'error', text: rs.data.msg}, {root: true});
          reject(rs);
        }
        dispatch('updateLoading', {loading_1: false}, {root: true});
      } catch (err) {
        console.error('threat save filter err : ', err);
        dispatch('updateLoading', {loading_1: false}, {root: true});
        reject(err);
      }
    })
  },
  //검색조건 등록, 수정
  action({dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      console.log('params : ', params);
      try {
        resolve(params);
      } catch (err) {
        console.error('threat save filter action err : ', err);
        reject(err);
      }
    })
  },
  //검새곶건 삭제
  delelte({dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {

      } catch (err) {
        console.log('threat save filter del err : ', err);
        reject(err);
      }
    });
  }
}

/**
 * 검색조건 저장 데이터 예시
 {
  "type": "threat_filter_test",
  "threat_filter_test": {
    "user_id": "admin",
    "user_nm": "관리자",
    "title": "검색조건 테스트 제목",
    "desc": "검색조건 테스트 내용",
    "mk_dt": "2021-06-23 12:27:22",
    "upd_dt": "2021-06-23 12:27:22",
    "location": "monitoring",
    "data": [
      {
        "mode": "include",
        "type": "indirect",
        "name": "탐지규칙명",
        "field": "rule_name",
        "data": "Etc-Etc-29-00-test.21032301ECSC#"
      },
      {
        "mode": "exclude",
        "type": "indirect",
        "name": "공격Port",
        "field": "attack_port",
        "data": "80"
      }
    ]
  }
}
 */