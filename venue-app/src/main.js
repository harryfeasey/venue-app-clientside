import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Venues from './Venues.vue';
import Venue from './Venue.vue';


import VueRouter from 'vue-router';
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.emulateJSON = true;

const routes = [

  {
      path: "/",
      component: Home
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
