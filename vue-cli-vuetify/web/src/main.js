import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import {store} from './store'

import router from './routes'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
