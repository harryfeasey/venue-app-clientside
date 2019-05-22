import Vue from 'vue'
import App from './App.vue'
import Profile from './Profile.vue';
import Venues from './Venues.vue';
import Venue from './Venue.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import Review from './Review.vue';
import AddVenue from './AddVenue.vue';
import EditVenue from './EditVenue.vue';


import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.http.options.emulateJSON = true;

Vue.config.silent = true;

const routes = [

  {
      path: "/profile/:profileId",
      name: "profile",
      component: Profile
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
    path: '/venues/view/:venueId',
    name: "venue",
    component: Venue
  },
  {
    path: '/register',
    name: "register",
    component: Register
  },
  {
    path: '/review/:venueId',
    name: "review",
    component: Review
  },
  {
    path: '/venues/create',
    name: "addVenue",
    component: AddVenue
  },
  {
    path: '/venues/edit/:venueId',
    name: "editVenue",
    component: EditVenue
  },
  { path: '/', redirect: '/venues' }

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
