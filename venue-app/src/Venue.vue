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
            <!--<td>Venue Category</td>-->

          </tr>
          <br/>
          <tr>
            <td>{{ venue.venueName}} </td>
            <td>{{ venue.city}}</td>
            <!--<td>{{venue.category.categoryName}}</td>-->

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
        venue: []
      }
    },

    mounted: function(){
      this.getSingleVenue($route.params.venueId);
    },
    methods: {

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
