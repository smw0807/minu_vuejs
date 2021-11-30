import fileDownload from 'js-file-download';
export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  }
}

export const getters = {
  GET_LIST(state) {
    return state.list;
  }
}

export const actions = {
  runWorker({commit, dispatch}, params) {
    return new Promise ( async (resolve, reject) => {
      try {
        dispatch('updateLoading', {loading_1: true}, {root: true}); //로딩 시작
        const rs = await this.$axios.post('/api/v1/test/worker_test', params);
        // console.log('test!!! ', rs);
        if (rs && rs.data.error === false) {
          if (rs.data.msg === 'already') {
            dispatch('updateAlert', {alert: true, type: 'warning', title: 'csv 다운로드', text: '아직 다운로드 중인 파일이 있습니다.'}, {root: true});  
          } else {
            fileDownload(new Buffer(rs.data.info.content.data), rs.data.info.fileName, rs.data.info.type);
            resolve(true);
          }
        } else {
          dispatch('updateAlert', {alert: true, type: 'error', title: 'ElasticSearch Error', text: rs.data.result}, {root: true});
          resolve(false);
        }
        dispatch('updateLoading', {loading_1: false}, {root: true}); //로딩 끝
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }
}