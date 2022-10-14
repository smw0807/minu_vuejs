const { sleep } = require('/utils/utils').default;
import { GuestBookAPI } from '@/apis/GuestBook';

export const state = () => {
  return {
    list: [],
  };
};

export const mutations = {
  list(state, payload) {
    state.list = payload;
  },
  SET_LIST(state, payload) {
    state.list = payload;
  },
};

export const getters = {
  list(state) {
    return state.list;
  },
  GET_LIST(state) {
    return state.list;
  },
};

export const actions = {
  initList({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch('updateLoading', { loading_1: true }, { root: true }); //로딩 시작
        const rs = await this.$axios.post('/api/v1/vtable/list');
        if (rs && rs.data.error === false) {
          commit('SET_LIST', rs.data.result);
          resolve(rs.data);
        } else {
          dispatch(
            'updateAlert',
            {
              alert: true,
              type: 'error',
              title: 'ElasticSearch Error',
              text: rs.data.result,
            },
            { root: true }
          );
          resolve(rs.data);
        }
        dispatch('updateLoading', { loading_1: false }, { root: true }); //로딩 끝
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  },
  GuestBookList({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const api = new GuestBookAPI(this.$axios);
        const list = await api.list();
        commit('list', list);
        resolve(true);
      } catch (err) {
        console.error(err);
        commit('list', []);
        reject(err.message);
      }
    });
  },
  GuestBookInsert({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const api = new GuestBookAPI(this.$axios);
        const insert = await api.insert(params);
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(err.message);
      }
    });
  },
};
