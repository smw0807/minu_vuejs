// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 
eslint-disable no-new 

여기서 애플리케이션에 사용할 CSS를 불러올 수 있다.
*/
require('./assets/app.css');

Vue.config.productionTip = false

new Vue({ //루트 Vue.js 인스턴스
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
