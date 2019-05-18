<template>
  <div>


    <div>
      <b-container>
        <b-row>

          <b-col>
            <label for="search">Venue Name</label>
            <b-form-input id="search" v-model="searchQuery" v-on:input="searchForVenues()" placeholder="Search by name..."></b-form-input>
            <div>
              <br>

              <b-form-group label="Max Cost Rating">
                <b-form-radio-group
                  id="btn-radios-3"
                  v-on:input="searchForVenues()"
                  v-model="maxCostQuery"
                  :options=maxCostOptions
                  buttons
                  button-variant="outline-primary"
                  name="radio-btn-stacked"
                ></b-form-radio-group>
              </b-form-group>



            </div>
          </b-col>
          <b-col>
            <label for="city-list">City</label>
            <b-form-input v-model="cityQuery" v-on:input="searchForVenues()" placeholder="Search by city..." list="city-data-list" id="city-list"></b-form-input>
            <b-form-datalist id="city-data-list" :options="cityOptions"></b-form-datalist>

            <div>
              <br>

              <b-form-group label="Min Star Rating">
                <b-form-radio-group
                  id="btn-radios-4"
                  v-on:input="searchForVenues()"
                  v-model="minStarsQuery"
                  :options=minStarsOptions
                  buttons
                  button-variant="outline-primary"
                  name="radio-btn-stacked"
                ></b-form-radio-group>
              </b-form-group>


            </div>


          </b-col>

          <b-col>
            <label>Category</label>
            <b-form-select v-model="categoryQuery" v-on:input="searchForVenues()" class="mb-3">
              <option :value="null">Search by venue category...</option>
              <option v-for="category in categories"  :value =category.categoryId>{{category.categoryName}}</option>
            </b-form-select>
          </b-col>

          <b-col>
            <label>Sort By</label>
            <b-form-select v-model="sortByQuery" v-on:input="searchForVenues()" class="mb-3">
              <option value ="STAR_RATING">Star Rating</option>
              <option value ="COST_RATING">Cost Rating</option>
              <option :disabled = isLocated value ="DISTANCE">Distance</option>
            </b-form-select>

            <b-form-checkbox
              id="checkbox-1"
              v-model="reverseQuery"
              v-on:input="searchForVenues()"
              name="checkbox-1"
              value=true
              unchecked-value=false

            >
              Reverse sort
            </b-form-checkbox>



            <!--//TODO Add Stars selection field-->
            <!--//TODO Add Cost selection field-->
          </b-col>
        </b-row>
        <!--<b-button variant="primary" v-on:click.prevent="searchForVenues()">Search</b-button>-->
        <b-button :disabled = !searchFlag variant="primary" v-on:click.prevent="init()">Clear Search</b-button>
      </b-container>





    </div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving venues: {{error}}
    </div>

    <br />

    <div v-if = "searchFlag" >
      <b-container>
        <b-row>
          <b-col>

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
                  :header=getCategory(venue.categoryId)
                  header-tag="footer"
                >
                  <b-card-text v-if="venue.meanStarRating !== null">
                    Mean Stars: {{venue.meanStarRating}}
                  </b-card-text>

                  <b-card-text v-else>
                    Mean Stars: <i>Not rated</i>
                  </b-card-text>


                  <b-card-text v-if="venue.modeCostRating !== null">
                    Mode Cost: {{venue.modeCostRating}}
                  </b-card-text>

                  <b-card-text v-else>
                    Mode Cost: <i>Not rated</i>
                  </b-card-text>


                  <b-button variant="primary" v-on:click.prevent="reroute(venue)">View</b-button>
                </b-card>
              </div>

            </b-card-group>
          </b-col>
        </b-row>
      </b-container>


    </div>

    <div v-else>
      <b-container>
        <b-row>
          <b-col>
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
                          Mean Stars: <i>Not rated</i>
                        </b-card-text>


                        <b-card-text v-if="venue.modeCostRating !== null">
                          Mode Cost: {{venue.modeCostRating}}
                        </b-card-text>

                        <b-card-text v-else>
                          Mode Cost: <i>Not rated</i>
                        </b-card-text>


                        <b-button variant="primary" v-on:click.prevent="reroute(venue)">View</b-button>
                      </b-card>
                    </div>

              </b-card-group>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>


</template>


<!--=====================================================V-U-E===================================================================-->

<script>
  export default {
    data (){
      return{
        error: "",
        errorFlag: false,
        venues: [],
        searchVenues: [],
        categories: [],


        reverseQuery: false,
        searchQuery: '',
        cityQuery: '',
        categoryQuery: null,
        sortByQuery: "STAR_RATING",
        searchFlag: false,
        maxCostQuery: null,
        minStarsQuery: null,
        isLocated: false,
        clientLat: null,
        clientLong: null,


        maxCostOptions: [
          { text: '0 Free ', value: 0},
          { text: '1 Low', value: 1},
          { text: '2 Med', value: 2},
          { text: '3 High', value: 3},
          { text: '4 Max', value: 4},
          ],

        minStarsOptions: [
          { text: '1 Star', value: 1},
          { text: '2 Stars', value: 2},
          { text: '3 Stars', value: 3},
          { text: '4 Stars', value: 4},
          { text: '5 Stars', value: 5},
        ],

        selected: null,
        cityOptions: [],
        catOptions: []

      }
    },

    mounted: function(){
      this.init();
    },
    methods: {
      init: function(){
        this.searchFlag =  false;
        this.$http.get('http://localhost:4941/api/v1/venues')
        // this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/venues')
          .then(function(response) {
            this.venues = response.data;


            //Initialise UI auto fill.
            this.getCategories();
            this.getCategoriesList();
            this.getCitiesList();

            //Reset some variables.
            this.categoryQuery = null;
            this.sortByQuery = "STAR_RATING";
            this.reverseQuery = false;
            this.maxCostQuery = null;
            this.minStarsQuery = null;

            //Check if the user has allowed location.
            this.getLocation();

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },




      //TODO Make this general for all searches.
      searchForVenues: function(){
        let queries = "";

        if(this.searchQuery !== null && this.searchQuery.trim() !== "") {
          queries += "&q=" + this.searchQuery
        }

        if(this.cityQuery !== null&& this.cityQuery.trim() !== "") {
          queries += "&city=" + this.cityQuery
        }

        if(this.categoryQuery !== null) {
          queries += "&categoryId=" + this.categoryQuery;

        }

        if(this.sortByQuery !== null) {
          queries += "&sortBy=" + this.sortByQuery;

          if(this.isLocated){
            queries += "&myLatitude=" + this.clientLat;
            queries += "&myLongitude=" + this.clientLong;
          }


        }

        if(this.reverseQuery) {
          queries += "&reverseSort=" + this.reverseQuery;

        }
        if(this.minStarsQuery !== null) {
          queries += "&minStarRating=" + this.minStarsQuery.toString();

        }

        if(this.maxCostQuery !== null) {
          queries += "&maxCostRating=" + this.maxCostQuery.toString();

        }



        this.$http.get('http://localhost:4941/api/v1/venues?' + queries.slice(1))
        .then(function (response) {
            this.searchVenues = response.data;
            this.getCategories();
            this.searchFlag = true;

          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          });

      },


      getCategories: function(){
        this.$http.get('http://localhost:4941/api/v1/categories')
        // this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/categories')
          .then(function(response) {
            this.categories = response.data;

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },

      getCategoriesList: function(){

        let unique = new Set();

        for(var i = 0; i <  this.categories.length; i++){

          unique.add(this.categories[i].categoryName);

        }

        this.catOptions = Array.from(unique);

      },


      getCitiesList: function(){

        let unique = new Set();

        for(var i = 0; i <  this.venues.length; i++){

          unique.add(this.venues[i].city);

        }

        this.cityOptions = Array.from(unique);

      },

      getCategory: function(id){
        for (var i = 0; i < this.categories.length; i++){

          if(this.categories[i].categoryId === id ){
            return this.categories[i].categoryName;
          }

        }
      },

      getLocation: function(){

          if ("geolocation" in navigator) {

            this.isLocated = true;
            navigator.geolocation.getCurrentPosition(function(position) {
              this.clientLat = position.coords.latitude;
              this.clientLong = position.coords.longitude;
            });

          } else {
            /* geolocation IS NOT available */
            this.isLocated = false;
          }

        },


      reroute(venue) {
        this.$router.push({ name: 'venue', params: { venueId: venue.venueId }})
      }


    }
  }

</script>
