//store dir
import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex);

import { test } from './subTest';

export const store = new Vuex.Store({
  state:{
    a:'aa'
  },
  mutations:{
    SET_A (state, payload) {
      state.a = payload;
    }
  },
  getters:{
    GET_A (state) {
      return state.a;
    }
  },
  actions:{
    api_test()  {
      console.log('api test..');
      /**
       * 여기선 this.$axios가 안먹힘
       * axios를 import하면 baseURL이 안맞는듯 
       * plugins에 있는 axios에서 또 작업을 해 줘야하는 것 같음...........
       */
      let rs = null;
      try {
        axios.post('/api2/test', function(rspn) {
          console.log(rspn);
        });
      } catch (err) {
        rs = err;
        console.error('api test error : ' , err);
      }
      return rs;
    },
    // api_test()  {
    //   //async/await이 안먹힘...nuxt에서 사용한것처럼 똑같이 쓰면 에러가뜸
    //   return new Promise( (resolve, reject) => {
    //     console.log('api test..');
    //     try {
    //       const rs = this.$axios.post('/api2/test');
    //       resolve(rs);
    //     } catch (err) {
    //       reject(true);
    //       console.error('api test error : ' , err);
    //     }
    //   })
    // },
  },
  modules:{
    test
  }
})