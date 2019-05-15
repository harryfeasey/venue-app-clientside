<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      {{ error }}
    </div>


    <div v-else>
      <div id = "venues">

        <div>
          <b-nav>
            <b-nav-item active><router-link :to="{ name: 'home'}">Home</router-link></b-nav-item>
            <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
            <b-nav-item>Reviews (WIP)</b-nav-item>
            <b-nav-item disabled>Logout</b-nav-item>
          </b-nav>
        </div>
        <br /><br />



        <b-card-group deck>
              <div v-for="venue in venues">
                <b-card
                  :title="venue.venueName"
                  :sub-title="venue.city"
                  img-src="https://picsum.photos/id/33/536/354"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                  :header=getCategory(venue.venueId)
                  header-tag="footer"
                >
                  <!--<b-card-text>-->
                    <!--{{ getCategory(venue.venueId)}}-->
                  <!--</b-card-text>-->


                  <b-card-text>
                    Mean Stars: {{ venue.meanStarRating}}
                  </b-card-text>

                  <b-card-text>
                    Mode Cost: {{ venue.modeCostRating}}
                  </b-card-text>



                  <b-button variant="primary" v-on:click.prevent="reroute(venue)">View</b-button>
                </b-card>
              </div>

        </b-card-group>
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
        categories: []
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
            this.getCategories();

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },

      getCategories: function(){
        this.$http.get('http://localhost:4941/api/v1/categories')
          .then(function(response) {
            this.categories = response.data;

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },

      getCategory: function(id){
        for (var i = 0; i < this.venues.length; i++){

          if(this.categories[i].categoryId == id ){
            return this.categories[i].categoryName;
          }


        }
      },



      reroute(venue) {
        this.$router.push({ name: 'venue', params: { venueId: venue.venueId }})
      }


    }
  }

</script>
