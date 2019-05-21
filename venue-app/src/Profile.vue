<template>
  <div>

    <div v-if = "errorFlag" style="color: red;">
      Error retrieving this profile. Does it exist?
    </div>

    <div v-else-if="!this.$route.params.profileId">

    </div>
    <div v-else-if="" >

      <div id = "profile" v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}" >
        <div v-if="profile.email != null">

          <p><strong>@{{profile.username}}</strong></p>

            <p><br /><br /><strong>Edit:</strong></p>

          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="input-group-1"
            >
              <b-form-input style="margin-bottom: 10px"
                id="input-1"
                v-model="profile.givenName"
                type="email"
                required
                :placeholder="profile.givenName"
              ></b-form-input>

              <b-form-input
                id="input-2"
                v-model="profile.familyName"
                type="email"
                required
                :placeholder="profile.familyName"
              ></b-form-input>

            </b-form-group>

            <b-form-group id="input-group-2" style="margin-bottom: 10px">
              <b-form-input style="margin-bottom: 10px"
                id="input-3"
                v-model="password"
                required
                placeholder="Enter current password"
              ></b-form-input>

              <b-form-input style="margin-bottom: 10px"
                id="input-4"
                v-model="newPass"
                required
                placeholder="New password"
              ></b-form-input>


            </b-form-group>

            <b-button type="submit" v-on:click.prevent="update()" variant="primary">Update</b-button>
          </b-form>

        </div>

        <div v-else>

          <b-container >
            <strong>{{profile.givenName}}'s Profile</strong><br/>
            <b-row>

              <b-col>{{profile.username}}</b-col>
              <b-col>{{profile.email}}</b-col>
              <b-col>{{profile.givenName}}</b-col>
              <b-col>{{profile.familyName}}</b-col>
            </b-row>
          </b-container>

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

      }, update: function(){

        this.$http.patch('http://localhost:4941/api/v1/users/'+ this.id, JSON.stringify({
          "givenName": profile.givenName,
          "familyName": profile.familyName,
          "password": profile.password,

        }), {headers: {
          'X-Authorization': this.$cookies.get('userToken')
        }} ).then((response) => {

          this.$cookies.set("userId", response.body.userId);
          this.$cookies.set("userToken", response.body.token);

          this.$router.push({ name: 'profile', params: { profileId: this.userId }})


        }, (error) =>{

          console.log(error);
          alert(error.statusText.toString());

        });
      }

    }
  }

</script>
