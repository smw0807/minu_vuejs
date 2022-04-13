import { createApp } from 'vue'

//퀘이사 추가
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import router from './router';
import store from './store'
import axios from './plugins/axios'

import App from './App.vue'
const app = createApp(App);
app.use(Quasar, {
  plugins: {}
})
app.use(router(store));
app.use(store);
app.provide('$axios', axios);
app.mount('#app');
