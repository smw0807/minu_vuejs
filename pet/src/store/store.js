import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); //Vue로 Vuex를 설정한다.

export const store = new Vuex.Store({ //Vuex.Store를 export해서 추후에 main.js 파일에서 사용할 수 있도록 한다.
    state: { //상태 객체
        products: {}
    },
    mutations: { //
        'SET_STORE' (state, products) {
            state.products = products;
        }
    }
})

