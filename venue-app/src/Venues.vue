<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      {{ error }}
    </div>


    <!--<div v-if = "$route.params.venueId">-->
      <!--<div id = "venue">-->
        <!--{{getSingleVenue($route.params.venueId)}}-->
        <!--<router-link :to="{ name: 'venues'}">Back to Venues</router-link>-->

        <!--<br /><br />-->

        <!--<table>-->
          <!--<tr>-->
            <!--<td>Venue Name</td>-->
            <!--<td>Venue City</td>-->

          <!--</tr>-->
          <!--<br/>-->
          <!--<tr>-->
            <!--<td>{{ venue.venueName}} </td>-->
            <!--<td>{{ venue.city}}</td>-->
            <!--<td>{{ venue.category.categoryName}}</td>-->

          <!--</tr>-->

        <!--</table>-->

      <!--</div>-->
    <!--</div>-->

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
        venues: [],
        venue: []
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

        this.$http.get('http://localhost:4941/api/v1/venues/'+id)
          .then(function(response) {
            this.venue = response.data;

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });

      }


    }
  }

</script>
