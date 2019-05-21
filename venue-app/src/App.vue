<template>
  <div id="app">
    <div>
      <b-nav style="background-color: ghostwhite">
        <b-nav-item style="color: #000;" disabled>VenueHub</b-nav-item>
        <b-nav-item v-if="$cookies.get('userToken') == null"><router-link :to="{ name: 'login'}">Login</router-link></b-nav-item>
        <b-nav-item v-if="$cookies.get('userToken') != null" active ><router-link :to="{ name: 'profile', params: { profileId: $cookies.get('userId') }}" >Profile</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
        <b-nav-item v-if="$cookies.get('userToken') != null"><p v-on:click.prevent="logout()" variant="primary">Logout</p></b-nav-item>
      </b-nav>
    </div>
    <br /><br />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>




<script>
  import {VueCookies as $cookies} from "vue-cookies";

  export default {
    methods: {

      logout: function () {
        console.log(this.$cookies.get('userToken'));

        this.$http.post('http://localhost:4941/api/v1/users/logout', {}, {
          headers: {
            'X-Authorization': this.$cookies.get('userToken')
          }

        })
          .then(function () {
            this.clearCookies();


          }, function (error) {
            console.log(error);
            this.error = error;
            this.errorFlag = true;
          });

      }, clearCookies: function(){

        this.$cookies.remove('userToken');
        this.$cookies.remove('userId');
        console.log("Logged em OUT.");

        location.reload()
      }
    }
  }

</script>
