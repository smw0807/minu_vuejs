import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './service/axios';
import VueCookies from 'vue-cookies';
import { store } from './store/store'; //상태 관리 vuex

Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.prototype.$Axios = axios; //컴포넌트에서 axios 전역으로 쓸 수 있게 이렇게 안하면 컴포넌트별로 aixos를 import 해야함

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
