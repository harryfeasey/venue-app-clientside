<template>
  <div id="app">
    <div>
      <b-nav style="background-color: ghostwhite">
        <b-nav-item style="color: #000;" disabled>VenueHub</b-nav-item>
        <b-nav-item active><router-link :to="{ name: 'login'}">Login</router-link></b-nav-item>
        <b-nav-item active><router-link :to="{ name: 'home'}">Profile</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
        <b-nav-item disabled>Logout</b-nav-item>
      </b-nav>
    </div>
    <br /><br />
    <router-view></router-view>
  </div>
</template>
