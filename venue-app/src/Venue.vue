<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      {{ error }}
    </div>


    <div v-if = "$route.params.venueId">




      <div id = "venue">

        <div>
          <b-nav>
            <b-nav-item active><router-link :to="{ name: 'home'}">Home</router-link></b-nav-item>
            <b-nav-item><router-link :to="{ name: 'venues'}">Venues</router-link></b-nav-item>
            <b-nav-item>Reviews (WIP)</b-nav-item>
            <b-nav-item disabled>Logout</b-nav-item>
          </b-nav>
        </div>
        <br /><br />

        <div>
          <b-card
            :title="venue.venueName"
            :sub-title=venue.city
            img-src="https://picsum.photos/id/33/536/354"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            :footer=venue.category.categoryName
            footer-tag="footer"
          >
            <!--<b-card-text>-->
              <!--{{ venue.city}}-->
            <!--</b-card-text>-->


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
