<template>
  <div>
    <div id="home">
      <b-nav>
        <b-nav-item active><router-link :to="{ name: 'home'}">Home</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
        <b-nav-item>Reviews (WIP)</b-nav-item>
        <b-nav-item disabled>Logout</b-nav-item>
      </b-nav>
    </div>
    <br /><br />

  </div>
</template>
