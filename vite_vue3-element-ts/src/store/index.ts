import { defineStore } from 'pinia';

export const Store = defineStore('Store', {
  state: () => ({
    root: 'hi',
  }),
  getters: {
    getRoot(state) {
      return state.root;
    },
  },
  actions: {
    test(isError: boolean) {
      return new Promise((resolve, reject) => {
        if (isError) {
          reject(true);
        }
        resolve(true);
      });
    },
  },
});
