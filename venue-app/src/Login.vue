<template>
  <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">
      <p><strong>Login to VenueHub</strong></p>
      <b-form>
        <b-form-group
          id="input-group-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Username or email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            required
            type="password"
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>


        <b-button type="submit" v-on:click.prevent="login(form)" variant="primary">Submit</b-button>
      </b-form>
    <div>
      <br />
      <b-link ><router-link :to="{ name: 'register'}">... Or click here to register</router-link></b-link>

    </div>

  </div>
</template>

<script>
  import BContainer from "bootstrap-vue/es/components/layout";
  import BRow from "bootstrap-vue/es/components/layout";
  export default {
    components: {BRow, BContainer},
    data() {
      return {
        form: {
          email: '',
          password: '',
        },

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"


      }
    },
    methods: {
      login: function(){

        this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
          "username": this.form.email,
          "email": this.form.email,
          "password": this.form.password,

        }),).then((response) => {

          this.$cookies.set("userId", response.body.userId);
          this.$cookies.set("userToken", response.body.token);

          location.reload();
          this.$router.push({ name: 'profile', params: { profileId: response.body.userId }})


        }, (error) =>{

          console.log(error);
          alert(error.statusText.toString());

        });

      },
    }
  }
</script>
