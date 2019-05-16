<template>
  <div>


    <div>
      <b-form-input v-model="searchQuery" placeholder="Search by venue name..."></b-form-input>
      <br />
      <!--//TODO Add City selection field-->
      <!--//TODO Add Stars selection field-->
      <!--//TODO Add Cost selection field-->
      <b-button variant="primary" v-on:click.prevent="searchForVenues(searchQuery)">Search</b-button>
    </div>

    <div v-if = "errorFlag" style="color: red;">
      {{ error }}
    </div>

    <br />

    <div v-if = "searchFlag" >
      <b-button variant="outine-primary" v-on:click.prevent="init()">Clear Search</b-button>
      <b-card-group deck>
        <div v-for="venue in searchVenues" >
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


            <b-button variant="primary" v-on:click.prevent="reroute(venue)">View</b-button>
          </b-card>
        </div>

      </b-card-group>


    </div>

    <div v-else>
      <div id = "venues">
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
                  :header=getCategory(venue.categoryId)
                  header-tag="footer"
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
        searchVenues: [],
        categories: [],
        searchQuery: '',
        searchFlag: false
      }
    },

    mounted: function(){
      this.init();
    },
    methods: {
      init: function(){
        this.searchFlag =  false;
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
        for (var i = 0; i < this.categories.length; i++){

          if(this.categories[i].categoryId === id ){
            return this.categories[i].categoryName;
          }

        }
      },

      //Make this general for all searches.
      searchForVenues: function(query){
        if(query.trim() !== "") {
          this.$http.get('http://localhost:4941/api/v1/venues?q=' + query)
            .then(function (response) {
              this.searchVenues = response.data;
              this.getCategories();
              this.searchFlag = true;

            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
        }
      },


      reroute(venue) {
        this.$router.push({ name: 'venue', params: { venueId: venue.venueId }})
      }


    }
  }

</script>
