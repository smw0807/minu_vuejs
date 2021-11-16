export const state = () => {
  return {
    list: [],
  }
}

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
}

export const getters = {
  GET_LIST(state) {
    return state.list;
  },
}

export const actions = {
  initList({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        dispatch('updateLoading', {loading_1: true}, {root: true});
        const rs = await this.$axios.post('/api/v1/file/list', params);
        commit('SET_LIST', rs.data.result);
        dispatch('updateLoading', {loading_1: false}, {root: true}); 
      } catch (err) {
        console.error(err);
        dispatch('updateLoading', {loading_1: false}, {root: true});
        reject(err);
      }
    });
  },
  uploadFile({commit, dispatch}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        // dispatch('updateLoading', {loading_1: true}, {root: true});
        console.log('store/uploadFile', params);
        const rs = await this.$axios.post('/api/v1/file/file_upload', params);
        console.log('store/uploadFile : ', rs);
        // dispatch('updateLoading', {loading_1: false}, {root: true}); 
        resolve(true);
      } catch (err) {
        console.error(err);
        // dispatch('updateLoading', {loading_1: false}, {root: true}); 
        reject(err);
      }
    })
  },
  uploadMultiFile({commit}, params) {
    return new Promise( async (resolve, reject) => {

    })
  },
  downloadFile({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        console.log(params);
        const p = {
          _index: params._index,
          _id: params._id
        };
        const rs = await this.$axios.get('/api/v1/file/download_file?q=' + JSON.stringify(p));
        // const rs = await this.$axios.post('/api/v1/file/download_file', p);
        console.log(rs);
        resolve(rs);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  },
  deleteFile({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const p = {
          _index: params._index,
          _id: params._id
        }
        const rs = await this.$axios.post('/api/v1/file/del_file', p);
        console.log(rs);
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    })
  }
}