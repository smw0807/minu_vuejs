import { createApp } from 'vue'

//퀘이사 추가
import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

import router from './router';

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}
})
myApp.use(router);

myApp.mount('#app');
