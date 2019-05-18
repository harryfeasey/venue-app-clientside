<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this venue.
    </div>


    <div v-if = "$route.params.venueId">

      <div id = "venue">

        <div>
          <b-card
            :title="venue.venueName"
            :sub-title=venue.city
            img-src="src/assets/no-image.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 50rem;"
            class="mb-2"
            :footer=venue.category.categoryName
            footer-tag="footer"
          >

            <b-card-text v-if="venue.meanStarRating !== null">
              Mean Stars: {{venue.meanStarRating}}
            </b-card-text>

            <b-card-text v-else>
              Mean Stars: Not rated
            </b-card-text>


            <b-card-text v-if="venue.modeCostRating !== null">
              Mode Cost: {{venue.modeCostRating}}
            </b-card-text>

            <b-card-text v-else>
              Mean Cost: Not rated
            </b-card-text>

            <b-card-text>
              {{ venue.shortDescription}}
              <br/><br/>
            </b-card-text>


            <!--<b-button href="#" variant="primary">Go somewhere</b-button>-->
          </b-card>
        </div>

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
        venue: [],
        id: this.$route.params.venueId

      }
    },

    mounted: function(){
      this.getSingleVenue();
    },
    methods: {

      getSingleVenue: function(){

        this.$http.get('http://localhost:4941/api/v1/venues/'+this.id)
        // this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/venues/'+this.id)
          .then(function(response) {
            this.venue = response.data;

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });

      },
      getImage: function(venue){

        if (venue.photos !=null) {
          for (let i = 0; i< venue.photos.length(); i++) {
            if(venue.photos[i].isPrimary) {
              return "http://localhost:4941/api/v1/venues/" + venue.venueId + "/photos/" + venue.photos[i].photoFilename
            }
          }
          return "src/assets/no-image.jpg"
        }
      },

    }
  }

</script>
