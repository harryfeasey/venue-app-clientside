<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this profile. Does it exist?

    </div>

    <div v-else >

      <div id = "profile" v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}" >


        <p><strong>@{{profile.username}}</strong></p>
          <b-img-lazy thumbnail left style="max-width: 100px; max-height: 100px; padding: 2px; margin-bottom: 5px; margin-right: 100%" :src="getUserImage(profile)" alt="Image"></b-img-lazy>
            <p><br />{{profile.givenName}} {{profile.familyName}}</p>
        <div v-if="profile.email != null">
          <p><strong>{{profile.email}}</strong></p>
          <p><strong>Edit Profile:</strong></p>

          <b-form >
            <b-form-group
              id="input-group-1"
            >


              <b-form-input style="margin-bottom: 5px"
                id="input-1"
                v-model="givenName"
                required
                :placeholder=givenName
              ></b-form-input>

              <b-form-input
                id="input-2"
                v-model="familyName"
                required
                :placeholder=familyName
              ></b-form-input>

            </b-form-group>

            <b-form-group id="input-group-2" style="margin-bottom: 5px">


              <b-form-input style="margin-bottom: 5px"
                id="input-4"
                v-model="newPass"
                required
                type = "password"
                placeholder="Change password"
              ></b-form-input>


            </b-form-group>

            <b-button type="submit" v-on:click.prevent="submit()" variant="primary">Update</b-button>
          </b-form>

          <b-modal ref="password-modal" hide-footer title="Enter current password to continue">
            <div class="d-block text-center">
              <b-form-input style="margin-bottom: 10px"
                            id="input-7"
                            required
                            v-model="password"
                            type = "password"
              ></b-form-input>
            </div>
            <b-button type="submit" v-on:click.prevent="checkPass(password)" variant="primary">Continue</b-button>
          </b-modal>


          <div v-if = "searchFlag" v-bind:style="{ padding: pad_admin, marginLeft: left_margin}">
            <b-container>
              <b-row>
                <b-col>

                  <b-card-group deck>
                    <div v-for="venue in searchVenues" >
                      <b-card
                        :title="venue['venueName']"
                        :sub-title="venue.city"
                        :img-src=getImage(venue)
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 15rem; max-height: 30rem;"
                        class="mb-2"
                        :header=getCategory(venue.categoryId)
                        header-tag="footer"
                      >
                        <b-card-text v-if="venue.meanStarRating != null">
                          Mean Stars: {{venue.meanStarRating.toFixed(1)}}
                        </b-card-text>

                        <b-card-text v-else>
                          Mean Stars: <i>N/A</i>
                        </b-card-text>


                        <b-card-text v-if="venue.modeCostRating != null">
                          Mode Cost: {{venue.modeCostRating.toFixed(1)}}
                        </b-card-text>

                        <b-card-text v-else>
                          Mode Cost: <i>N/A</i>
                        </b-card-text>

                      </b-card>
                    </div>

                    <b-button style="max-height: 5rem" type="submit" v-on:click.prevent="rerouteCreateVenue()" variant="primary">Create venue</b-button>
                  </b-card-group>
                </b-col>
              </b-row>
            </b-container>

          </div>

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
        searchFlag: false,
        profile: [],
        searchVenues: [],
        categories: [],

        newPass: null,
        familyName: '',
        givenName: '',
        password: null,
        id: this.$route.params.profileId,

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "0% 5% 2% 5%",
        pad_admin: "1% 1% 2% 1%",
        left_margin: "-3%"

      }
    },



    mounted: function(){

      this.getProfile();
      this.getAdminVenues();
    },



    methods: {

      getProfile: function(){

        if(this.$cookies.get('userToken') != null && this.id === $cookies.get('userId')){
          this.$http.get('http://localhost:4941/api/v1/users/'+this.id, {
            headers: {
              'X-Authorization': this.$cookies.get('userToken')
            }

          })
          .then(function(response) {
            this.profile = response.data;

            this.givenName = this.profile.givenName;
            this.familyName = this.profile.familyName;



          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });

        } else if (this.id){
          //Send without auth token - we are viewing someone else.
          this.$http.get('http://localhost:4941/api/v1/users/'+this.id)
            .then(function(response) {
              this.profile = response.data;


            }, function(error) {
              this.error = error;
              this.errorFlag = true;
            });



        }else{
          location.reload();
          this.reroute();

        }
      },
      reroute: function(){
        this.$router.push({ name: 'profile', params: { profileId: this.id }})

      },
      submit: function() {


        if (this.newPass !== "") {

          //Try login with password and continue if success.
          //Open modal to ask for password.


          this.showModal();

        } else {
          alert("Please enter password.");
        }

      },

      showModal() {
        this.$refs['password-modal'].show()
      },

      checkPass(password){

        this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
          "username": this.profile.email,
          "email": this.profile.email,
          "password": password,

        }),).then((response) => {

          this.$cookies.set("userToken", response.body.token);

          this.updateInfo(password);


        }, (error) =>{


          alert(error.statusText.toString());

        });



      }, updateInfo(password){

        let patchedGiven = this.givenName;
        if(this.givenName === null){
          patchedGiven =  this.profile.givenName
        }

        let patchedFamily = this.familyName;
        if(this.familyName === null){
          patchedFamily =  this.profile.familyName
        }
        let patchedPass = this.newPass;
        if(this.newPass === null){
          patchedPass =  password
        }

        // console.log(patchedGiven, patchedFamily, patchedPass);

        this.$http.patch('http://localhost:4941/api/v1/users/' + this.id, JSON.stringify({
          "givenName": patchedGiven,
          "familyName": patchedFamily,
          "password": patchedPass

        }), {
          headers: {
            'X-Authorization': this.$cookies.get('userToken')
          }
        }).then((response) => {

          location.reload();


        }, (error) => {

          console.log(error);
          alert(error.statusText.toString());

        });



      },

      getUserImage: function(profile){
        // if (profile.x !== null) {
        //
        //   // return "http://localhost:4941/api/v1/venues/"+venue.venueId+"/photos/"+venue.primaryPhoto
        // } else{
          return "/src/assets/placeholder-user.png"
        // }
      },

      getAdminVenues: function(){

        this.$http.get('http://localhost:4941/api/v1/venues?adminId=' + this.id)
          .then(function (response) {
            this.searchVenues = response.data;
            this.getCategories();
            // console.log(this.searchVenues);
            this.searchFlag = true;

          }, function (error) {
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

      getImage: function(venue){
        if (venue.primaryPhoto !=null) {
          return "http://localhost:4941/api/v1/venues/"+venue.venueId+"/photos/"+venue.primaryPhoto
        } else{
          return "/src/assets/no-image.jpg"
        }
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
      rerouteCreateVenue(venue) {
        this.$router.push({ name: 'addVenue'})
      },




    }
  }

</script>
