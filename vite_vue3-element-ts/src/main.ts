import { createApp } from 'vue'
// import './style.css'
import { setupElementPlus } from './plugins/element-plus';

import App from './App.vue'

const app = createApp(App);

setupElementPlus(app);

app.mount('#app')
