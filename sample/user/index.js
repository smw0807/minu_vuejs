import Vue from 'vue'
import Hello from 'hello.vue'

const app = new Vue({
  render: (h) => h(Hello)
}).$mount('#app')