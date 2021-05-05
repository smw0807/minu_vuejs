export const state = () => {
  return {
    api_test: '',
    es_test: ''
  }
}

export const mutations = {
  SET_API_TEST(state, payload) {
    state.api_test = payload;
  },
  SET_ES_TEST(state, payload) {
    state.es_test = payload;
  }
}

export const getters = {
  GET_API_TEST(state) {
    return state.api_test;
  },
  GET_ES_TEST(state) {
    return state.es_test;
  }
}

export const actions = {
  apitest({commit}) { //api 테스트 용
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/test');
        commit('SET_API_TEST', rs);
        resolve(rs);
      } catch (err) {
        console.error('apitest err : ' , err);
        reject(err);
      }
    })
  },
  elasticTest({commit}) { //ElasticSearch 연결 확인용
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/test/es_test');
        console.log('elasticTest :' , rs);
        commit('SET_ES_TEST', rs);
        resolve(rs);
      } catch (err) {
        console.error('elasticTest err : ', err);
        reject(err);
      }
    })
  }
}