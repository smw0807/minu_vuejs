import { createApp } from 'vue';

//퀘이사 추가
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import timeago from 'vue-timeago3';

import router from './router';
import store from './store';
import axios from './plugins/axios';
import axiosInterceptor from './plugins/interceptor';
axiosInterceptor(store);

import App from './App.vue';
const app = createApp(App);
app.use(Quasar, {
  plugins: {},
});
app.use(router(store));
app.use(store);
app.use(timeago);
app.provide('$axios', axios);
app.mount('#app');
