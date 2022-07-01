import "bootstrap/dist/css/bootstrap.css";
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';

// Vue.prototype.$http = axios;

createApp(App).use(store).use(router).mount('#app')

// import "bootstrap/dist/js/bootstrap";
