export const state = () => {
  return {
    tree_list: [],
    code_list: [],
  }
}

export const mutations = {
  SET_TREE_LIST(state, payload) {
    state.tree_list = payload;
  },
  SET_CODE_LIST(state, payload) {
    state.code_list = payload;
  }
}

export const getters = {
  GET_TREE_LIST(state) {
    return state.tree_list;
  },
  GET_CODE_LIST(state) {
    return state.code_list;
  }
}

export const actions = {
  treeList({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/code/tree_list', params);
        console.log('treeList : ', rs);
        const data = rs.data.result;
        //level0~3까지 3포문?
        //0이후로 level이 달라질 때 마다 새 포문 사용? children... 
        //어떻게 만들어야하지??? 머리가 안돌아간다.
        /**
         * [
         *  {
         *    main
         *    
         *  }
         * ]
         */
        console.log(data);
        let list = [];
        let tree = {};
        let level = 0;
        for (let i in data) {
          let d = data[i];
          if (d.level === 0) {
            list.push(d)
          } else {
            list[0].children.push(d);

          }
        }
        console.log(list);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  },

  codeList({commit, dispatch}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/v1/code/code_list', params);
        console.log('codeList : ', rs);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }

}