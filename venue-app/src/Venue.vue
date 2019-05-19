<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this venue.
    </div>


    <div v-else-if= "$route.params.venueId">

      <div id = "venue">

        <div>
          <b-jumbotron>
            <template slot="lead">{{venue.venueName}}, {{venue.city}}</template>


            <hr class="my-4">



            <p>
              <strong>Address: </strong><i>{{venue.address}}</i><br /><br />
              <strong>Category: </strong><i>{{venue.category.categoryName}}</i><br /><br />

              <strong>Description:</strong><br />
              {{venue.shortDescription}}
            </p>



            <div v-if="venue.longDescription != ''&& venue.longDescription != null">
              <b-button v-b-modal.modal-center>See More</b-button>

              <b-modal id="modal-center" centered title="More Info">
                <p  class="my-4">{{venue.shortDescription}}<br /><br />{{venue.longDescription}}</p>
              </b-modal>

            </div>

            <div v-else>
              <b-button disabled="true" >See more</b-button>
            </div>

            <p>
              <br />
              <br />
              <strong>Ratings: </strong>
              <br />
              Mode Cost:
              <i>{{cost}}</i>
              <br />

              Mean Stars:
                <i>{{stars}}</i>


            </p>


            <div v-if="venue.photos.length >= 1">

              <strong>Photos: </strong>
                <div v-for="photo in venue.photos">

                  <b-img-lazy style="width: 200px; height: 200px" v-bind="mainProps" :src="getImage(photo)" alt="Image 8"></b-img-lazy>



                </div>

              <br />
              Administered by:
              <i>{{venue.admin.username}}</i>

              <br />
              Added:
              <i>{{venue.dateAdded}}</i>
            </div>

            <div v-else>
              <strong>Photos:  None available</strong>

            </div>

          </b-jumbotron>
        </div>

      </div>
    </div>
  </div>


</template>




<script>
  import BCardImgLazy from "bootstrap-vue/es/components/card";
  import BCarousel from "bootstrap-vue/es/components/carousel";
  export default {
    components: {BCarousel, BCardImgLazy},
    data (){
      return{
        error: "",
        errorFlag: false,
        venue: [],
        id: this.$route.params.venueId,
        stars: null,
        cost: null


      }
    },

    mounted: function(){
      this.getRatings()
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

      getRatings: function(){
        this.searchFlag =  false;
        this.$http.get('http://localhost:4941/api/v1/venues')
        // this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/venues')
          .then(function(response) {
            this.venues = response.data;

            for(let i = 0; i < this.venues.length; i++){
              if( this.venues[i].venueId == this.id){
                this.stars = this.venues[i].meanStarRating;
                this.cost =  this.venues[i].modeCostRating;
              }
            }


          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },


      getImage: function(photo){

        return "http://localhost:4941/api/v1/venues/" + this.id + "/photos/" + photo.photoFilename

      },

    }
  }

</script>
