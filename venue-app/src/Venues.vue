<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      {{ error }}
    </div>


    <div v-if = "$route.params.venueId">
      <div id = "venue">
        <router-link :to="{ name: 'venues'}">Back to Venues</router-link>

        <br /><br />

        <table>
          <tr>
            <td>Venue Name</td>
            <td>Venue City</td>

          </tr>
          <br/>
          <tr>
            <td>{{ getSingleVenue($route.params.venueId).venueName}} </td>
            <td>{{ getSingleVenue($route.params.venueId).city}}</td>

          </tr>

        </table>

      </div>
    </div>

    <div v-else>
      <div id = "venues">

        <table>

            <tr v-for="venue in venues">
              <td>{{venue.venueName}}</td>
              <td><router-link :to= "{ name: 'venue', params: { venueId: venue.venueId }}">View</router-link></td>
            </tr>

        </table>

      </div>
    </div>
  </div>


</template>




<script>
  export default {
    data (){
      return{
        error: "",
        errorFlag: false,
        venues: []
      }
    },

    mounted: function(){
      this.getVenues();
    },
    methods: {
      getVenues: function(){
        this.$http.get('http://localhost:4941/api/v1/venues')
          .then(function(response) {
            this.venues = response.data;

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },
      getSingleVenue: function(id){
        for(let i = 0; i < this.venues.length; i++){
          if(this.venues[i].venueId == id){
            return this.venues[i];
          }
        }
      }


    }
  }

</script>
