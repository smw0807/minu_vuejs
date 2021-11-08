export const state = () => {
  return {
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
      
    });
  },
  uploadFile({commit}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('store/uploadFile', params);
        let formData = new FormData();
        formData.append('file', params.file);
        console.log(formData);
        const rs = await this.$axios.post('/api/v1/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('store/uploadFile : ', rs);
        resolve(false);
      } catch (err) {
        console.error(err);
        reject(false);
      }
    })
  }
}