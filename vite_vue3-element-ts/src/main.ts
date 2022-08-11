import { createApp } from 'vue'
// import './style.css'
import { setupElementPlus } from './plugins/element-plus';
import { setupRouter } from './routes';

import App from './App.vue'

const app = createApp(App);

setupElementPlus(app);
setupRouter(app);

app.mount('#app')
