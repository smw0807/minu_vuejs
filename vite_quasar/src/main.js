import { createApp } from 'vue'

//퀘이사 추가
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import router from './router';
import store from './store'

import axios from './plugins/axios'

// import VueCookies from 'vue3-cookies'

import App from './App.vue'
const app = createApp(App);
app.use(Quasar, {
  plugins: {}
})
app.use(router);
app.use(store);
// app.use(VueCookies);
app.provide('$axios', axios);
// app.provide('$store', store);
app.mount('#app');
