import Vue from 'vue'
import App from './App.vue'
import Routes from './routes'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueJwtDecode from 'vue-jwt-decode'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueJwtDecode);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
