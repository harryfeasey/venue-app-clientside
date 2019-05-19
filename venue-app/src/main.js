import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Venues from './Venues.vue';
import Venue from './Venue.vue';
import Login from './Login.vue';
import Register from './Register.vue';


import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.silent = true;

Vue.http.options.emulateJSON = true;

const routes = [

  {
      path: "/",
      name: "home",
      component: Home
  },
  {
      path: "/login",
      name: "login",
      component: Login
  },
  {
    path: "/venues",
    name: "venues",
    component: Venues

  },
  {
    path: '/venues/:venueId',
    name: "venue",
    component: Venue
  },
  {
    path: '/register',
    name: "register",
    component: Register
  }

];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
