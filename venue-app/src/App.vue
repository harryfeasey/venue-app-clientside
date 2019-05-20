<template>
  <div id="app">
    <div>
      <b-nav style="background-color: ghostwhite">
        <b-nav-item style="color: #000;" disabled>VenueHub</b-nav-item>
        <b-nav-item v-if="$cookies.get('userId')"><router-link :to="{ name: 'login'}">Login</router-link></b-nav-item>
        <b-nav-item active><router-link :to="{ name: 'profile'}">Profile</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
        <b-nav-item v-if="$cookies.get('userId')"><p v-on:click.prevent="logout()" variant="primary">Logout</p></b-nav-item>
      </b-nav>
    </div>
    <br /><br />
    <router-view></router-view>
  </div>
</template>




<script>
  export default {
    methods: {

      logout: function () {
        console.log(this.$cookies.get('userToken'));
        this.$http.post('http://localhost:4941/api/v1/users/logout', {
          headers: {
            'X-Authorization': this.$cookies.get('userToken')
          }

        })
          .then(function () {
            console.log("WARioor");
            location.reload()

          }, function (error) {
            console.log(error);
            this.error = error;
            this.errorFlag = true;
          });

      }
    }
  }

</script>
