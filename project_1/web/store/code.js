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
        /**
         * [
         *  {
         *    main
         *    
         *  }
         * ]
         */
        let list = [];
        let tree = {};
        let level = 0;
        data[0].children = [];
        console.log(data);
        // const test = data.flatMap( doc => {
        //   console.log(doc);
        //   if (doc.level === 1) {
        //     return doc;
        //   } else {
        //     return null;
        //   }
        // });
        let tmp = [];
        data.splice(1, 1);
        console.log(data);
        for (let i in data) {
          if (data[i].level === 1) {
            tree = data[i];
          } else {
            if (data[i].level !== 1) {
              tree.children = [];
              tree.children.push(data[i]);
            }
          }
          tmp.push(tree);
        }
        console.log(tmp);
        // commit('SET_TREE_LIST', list);
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