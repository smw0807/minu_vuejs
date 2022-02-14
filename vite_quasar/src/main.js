import { createApp } from 'vue'
//퀘이사 추가
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'

import router from './router';

const myApp = createApp(App);
myApp.use(Quasar, {
  plugins: {}
})
myApp.use(router);

myApp.mount('#app');
