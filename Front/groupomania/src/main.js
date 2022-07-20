import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Je voulais utiliser bootstrap à la base mais j'ai changé d'avis
// import "bootstrap/dist/css/bootstrap.css";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
