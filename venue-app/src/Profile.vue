<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this profile. Does it exist?
    </div>

    <div v-else >

      <div id = "profile" v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}" >


        <p><strong>@{{profile.username}}</strong></p>
          <b-img-lazy thumbnail left style="max-width: 200px; max-height: 300px; padding: 2px; margin-bottom: 5px; margin-right: 100%" :src="getImage(profile)" alt="Image"></b-img-lazy>
            <p><br /><br /><strong>{{profile.givenName}} {{profile.familyName}}</strong></p>
        <div v-if="profile.email != null">
          <p><strong>{{profile.email}}</strong></p>
          <p><br /><strong>Edit:</strong></p>

          <b-form >
            <b-form-group
              id="input-group-1"
            >


              <b-form-input style="margin-bottom: 10px"
                id="input-1"
                v-model="givenName"
                required
                placeholder="Given name"
              ></b-form-input>

              <b-form-input
                id="input-2"
                v-model="familyName"
                required
                placeholder="Family name"
              ></b-form-input>

            </b-form-group>

            <b-form-group id="input-group-2" style="margin-bottom: 10px">


              <b-form-input style="margin-bottom: 10px"
                id="input-4"
                v-model="newPass"
                required
                placeholder="New password"
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
        profile: [],
        newPass: null,
        familyName: null,
        givenName: null,
        password: null,
        id: this.$route.params.profileId,

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"

      }
    },



    mounted: function(){

       this.getProfile();
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


        if (this.newPass != null) {

          //Try login with password and continue if success.
          //Open modal to ask for password.


          this.showModal();

        } else{
          console.log("hola");

          // Send off new names.
          this.$http.patch('http://localhost:4941/api/v1/users/' + this.id, JSON.stringify({
            "givenName": this.givenName,
            "familyName": this.familyName,
            "password": this.password

          }), {
            headers: {
              'X-Authorization': this.$cookies.get('userToken')
            }
          }).then((response) => {

            console.log(response);
            // location.reload()


          }, (error) => {

            console.log(error);
            alert(error.statusText.toString());

          });



        }

      },

      showModal() {
        this.$refs['password-modal'].show()
      },
      hideModal() {
        this.$refs['password-modal'].hide()
      },

      checkPass(password){
        console.log(this.profile.email);

        this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
          "username": this.profile.email,
          "email": this.profile.email,
          "password": password,

        }),).then((response) => {

          this.$cookies.set("userToken", response.body.token);

          this.changePass();


        }, (error) =>{

          console.log(error);
          alert(error.statusText.toString());

        });



      }, changePass(){


        this.$http.patch('http://localhost:4941/api/v1/users/' + this.id, JSON.stringify({
          "givenName": this.givenName,
          "familyName": this.familyName,
          "password": this.newPass

        }), {
          headers: {
            'X-Authorization': this.$cookies.get('userToken')
          }
        }).then((response) => {

          this.$cookies.set("userId", response.body.userId);
          this.$cookies.set("userToken", response.body.token);

          this.$router.push({name: 'profile', params: {profileId: this.userId}})


        }, (error) => {

          console.log(error);
          alert(error.statusText.toString());

        });



      },

      getImage: function(profile){
        // if (profile.x !== null) {
        //
        //   // return "http://localhost:4941/api/v1/venues/"+venue.venueId+"/photos/"+venue.primaryPhoto
        // } else{
          return "/src/assets/placeholder-user.png"
        // }
      },

    }
  }

</script>
