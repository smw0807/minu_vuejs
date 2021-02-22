// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './service/axios';
import VueCookies from 'vue-cookies';
import { store } from './store/store'; //상태 관리 vuex

Vue.config.productionTip = false;

Vue.use(VueCookies);

Vue.prototype.$Axios = axios; //axios 전역으로 쓸 수 있게

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
