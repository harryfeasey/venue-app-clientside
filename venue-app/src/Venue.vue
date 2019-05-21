<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this venue.
    </div>


    <div v-else-if= "$route.params.venueId">

      <div id = "venue">

        <div>
          <b-jumbotron style="background-color: white; padding-left: 5%">
            <template slot="lead">{{venue.venueName}}, {{venue.city}}</template>


            <hr class="my-4">



            <p>
              <strong>Address: </strong><i>{{venue.address}}</i><br /><br />
              <strong>Category: </strong><i>{{venue['category']['categoryName']}}</i><br /><br />

              <strong>Description:</strong><br />
              {{venue.shortDescription}}
            </p>



            <div v-if="venue.longDescription != ''&& venue.longDescription != null">
              <b-button variant="primary" v-b-modal.modal-center>See More</b-button>

              <b-modal id="modal-center" centered title="More Info">
                <p  class="my-4">{{venue.shortDescription}}<br /><br />{{venue.longDescription}}</p>
              </b-modal>

            </div>

            <div v-else>
              <b-button disabled="true" >See more</b-button>
            </div>

            <p>
              <hr />
              <strong>Ratings: </strong>
              <br />
              Mode Cost:
              <i>{{cost}}</i>
              <br />

              Mean Stars:
              <i>{{stars}}</i>

            </p>

            <div>
              <b-button variant="primary" v-b-modal.center>See Reviews</b-button>

              <b-modal id="center" centered title="All Reviews">
                <div v-if="reviews.length !== 0">

                  <div v-for="review in reviews">

                    <p  class="my-4">
                      <b>@{{review.reviewAuthor.username}}:</b>
                      <br />
                      {{review.reviewBody}}
                      <br /><br />
                      Stars: {{review.starRating}}
                      <br />
                      Cost: {{review.costRating}}
                      <br /><br />
                      Posted: {{review.timePosted}}
                    </p>
                    <hr />
                  </div>
                </div>

                <div v-else>
                  <p class="my-4">No reviews yet.</p>
                </div>

                <b-button :disabled="!$cookies.get('userId')" v-on:click.prevent="reroute(venue)" >Write Review</b-button>
              </b-modal>


            </div>


            <hr />
            <div v-if="venue.photos.length >= 1">




              <b-container fluid class="p-4 bg-dark">
                <b-row>
                  <b-col v-for="photo in venue.photos">

                  <b-img-lazy thumbnail left style="max-width: 300px; max-height: 300px; padding: 2px; margin-bottom: 5px;" v-bind="mainProps" :src="getImage(photo)" :alt=photo.photoDescription></b-img-lazy>

                  </b-col>
                </b-row>
              </b-container>

            </div>


            <div v-else>
              <br />
              <strong>Photos:  None available</strong>

            </div>
            <br />
            <hr />
            Admin user:
            <i>{{venue.admin.username}}</i>

            <br />
            Added:
            <i>{{new Date(venue.dateAdded).toDateString()}}</i>

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
        reviews:[],
        id: this.$route.params.venueId,
        stars: null,
        cost: null


      }
    },

    mounted: function(){
      this.getRatings();
      this.getReviews();
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
      getReviews: function(){
        this.$http.get('http://localhost:4941/api/v1/venues/'+this.id+'/reviews')
          .then(function(response) {
            this.reviews = response.data;


          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },


      getImage: function(photo){

        return "http://localhost:4941/api/v1/venues/" + this.id + "/photos/" + photo.photoFilename

      },

      reroute(venue) {
        this.$router.push({ name: 'review', params: { venueId: this.id }, props: {venueName: venue.venueName}})
      }

    }
  }

</script>
