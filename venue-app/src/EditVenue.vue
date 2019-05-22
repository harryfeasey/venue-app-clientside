<template>
  <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">

    <p><strong>Edit Venue</strong></p>

    <b-form>
      <b-form-group
        id="input-group-1"
      >
        <b-form-input style="margin-bottom: 10px"
                      id="input-5"
                      v-model=form.name
                      required
                      placeholder="Venue name"
        ></b-form-input>

        <label>Update Category:</label>
        <b-form-select v-model="form.category" class="mb-3">
          <option :value="null">Choose category...</option>
          <option v-for="category in categories"  :value =category.categoryId>{{category.categoryName}}</option>
        </b-form-select>
        <b-form-input style="margin-bottom: 10px"
                      id="input-6"
                      v-model="form.shortDescription"
                      required
                      placeholder="Short description"
        ></b-form-input>
        <b-form-input style="height: 15%; padding-bottom: 25%;"
                      id="input-7"
                      v-model="form.longDescription"
                      required
                      placeholder="Long description"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
                      id="input-8"
                      v-model="form.city"
                      required
                      placeholder="City"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
                      id="input-9"
                      v-model="form.address"
                      required
                      placeholder="Address"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
                      id="input-10"
                      v-model="form.lat"
                      required
                      placeholder="Latitude"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
                      id="input-11"
                      v-model="form.long"
                      required
                      placeholder="Longitude"
        ></b-form-input>
      </b-form-group>

    </b-form>


    <b-button variant="primary" v-on:click.prevent="submit()">Submit</b-button>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.venueId,
        form: {
          name: '',
          category: null,
          shortDescription: '',
          longDescription: '',
          city: '',
          address: '',
          lat: '',
          long: '',

        },

        categories: [],
        venue: [],

        bgColor: 'white',
        bgWidth: '80%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"

      }
    },

    mounted: function(){

      this.getCategories();
      this.getSingleVenue();

    },
    methods: {

      submit() {

        //Submit the form of user's data
        let data = {
          "venueName" : this.form.name,
          "categoryId" : this.form.category,
          "city" : this.form.city,
          "shortDescription" : this.form.shortDescription,
          "longDescription" : this.form.longDescription,
          "address" : this.form.address,
          "latitude" : parseInt(this.form.lat),
          "longitude" : parseInt(this.form.long),
        };


        this.$http.patch('http://localhost:4941/api/v1/venues/'+this.id, JSON.stringify(data),{
          headers: {
            'X-Authorization': this.$cookies.get('userToken')
          }
        })
          .then((response) => {

            console.log(response);
            this.$router.push({ name: 'venues'})


          }, (error) => {
            console.log(error);
            alert(error.statusText.toString());
          });

      },

      getSingleVenue: function(){

        this.$http.get('http://localhost:4941/api/v1/venues/'+this.id)
        // this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/venues/'+this.id)
          .then(function(response) {
            this.venue = response.data;

            this.form.name = this.venue.venueName;
            this.form.shortDescription = this.venue.shortDescription;
            this.form.longDescription = this.venue.longDescription;
            this.form.city = this.venue.city;
            this.form.address = this.venue.address;
            this.form.lat = this.venue.latitude;
            this.form.long = this.venue.longitude;

            console.log((this.venue.category.categoryId));
            console.log(this.getCategory(this.venue.category.categoryId));
            this.form.category =this.venue.category.categoryId;




          }, function(error) {
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

      getCategory: function(id){
        // console.log(id);
        for (var i = 0; i < this.categories.length; i++){

          if(this.categories[i].categoryId === id ){
            return this.categories[i].categoryName;
          }

        }
      },


    }
  }
</script>
