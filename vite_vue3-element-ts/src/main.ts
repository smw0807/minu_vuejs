import { createApp } from 'vue';
// import './style.css'
import { setupElementPlus } from './plugins/element-plus';
import { setupRouter } from './routes';
import { createPinia } from 'pinia';
import timeago from 'vue-timeago3';

import App from './App.vue';

const app = createApp(App);

setupElementPlus(app);
setupRouter(app);

//pinia 적용
app.use(createPinia());
app.use(timeago);

app.mount('#app');
