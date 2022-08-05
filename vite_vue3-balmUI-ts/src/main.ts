import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import { setupRouter } from './routes';
import { setupBalmUI } from './plugins/balm';

const app = createApp(App);

setupRouter(app);
setupBalmUI(app);

app.mount('#app');
