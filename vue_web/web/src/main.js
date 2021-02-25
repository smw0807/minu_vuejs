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
  template: '<App/>',
  created() {
    let token = store.getters.getToken;
    console.log(token);
    if (token.access == null && token.refresh == null) {
      this.$router.push({name: 'Login'});
    }
    if (token.access == null && token.refresh != null) { //accessToken 재요청
      console.log('111')
      this.$store.dispatch('refreshToken');
      // axios.interceptors.response.use(null, error => {
      //   console.log('222');
      //   if (error.response.stauts === 401) {
      //     console.log('333');
      //     error.config.header['x-access-token'] = token.accessToken;
      //     return axios.request(error.config);
      //   }
      // });
    }
  }
})
