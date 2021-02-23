import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); //Vue로 Vuex를 설정한다.

export const store = new Vuex.Store({ //Vuex.Store를 export해서 추후에 main.js 파일에서 사용할 수 있도록 한다.
    state: { //상태 객체
        products: {}
    },
    mutations: { //전달받은 products를 state.products에 할당
        'SET_STORE' (state, products) {
            state.products = products;
        }
    },
    getters: { //products 반환
        products(state) {
            return state.products;
        }
    },
    actions: { //비동기 코드를 위해 액션 객체를 사용한다.
        initStore: ({commit}) =>{ //뮤테이션을 커밋함
            axios.get('/static/products.json').then(response => {
                commit('SET_STORE', response.data.products);
            });
        }
    }
})

