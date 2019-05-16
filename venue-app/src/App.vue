<template>
  <div id="app">
    <div>
      <b-nav>
        <b-nav-item active><router-link :to="{ name: 'home'}">Profile</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
        <b-nav-item>Reviews (WIP)</b-nav-item>
        <b-nav-item disabled>Logout</b-nav-item>
      </b-nav>
    </div>
    <br /><br />
    <router-view></router-view>
  </div>
</template>
