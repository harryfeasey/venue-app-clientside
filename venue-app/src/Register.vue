<template>
  <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">

    <p><strong>Register to VenueHub</strong></p>

    <b-form>
      <b-form-group
        id="input-group-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input style="margin-bottom: 10px"
          id="input-5"
          v-model=form.fname
          required
          placeholder="First name"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
          id="input-4"
          v-model="form.lname"
          required
          placeholder="Last name"
        ></b-form-input>
        <b-form-input style="margin-bottom: 10px"
          id="input-6"
          v-model="form.username"
          required
          placeholder="Username"
        ></b-form-input>
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2">
        <b-form-input style="margin-bottom: 10px"
          id="input-2"
          v-model="form.password"
          required
          type="password"
          placeholder="Password"
        ></b-form-input>


        <b-form-input
          id="input-3"
          v-model="form.password2"
          required
          type="password"
          placeholder="Repeat password"
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
        form: {
          fname: '',
          lname: '',
          email: '',
          username: '',
          password: '',
          password2: '',
        },

        userId: null,
        errorFlag: false,

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"

      }
    },
    methods: {

      submit() {
        let errorMsg = this.validation();
        if(errorMsg === ""){


          //Submit the form of user's data
          let data = {
            "username" : this.form.username,
            "email" : this.form.email,
            "givenName" : this.form.fname,
            "familyName" : this.form.lname,
            "password" : this.form.password,
          };


          this.$http.post('http://localhost:4941/api/v1/users', JSON.stringify(data),{
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              if (response.status === 400){

                alert(response.statusText.toString());
                this.errorFlag = true;


              } else {

                this.userId = response.data.userId;


              }

            }, (error) => {
              console.log("hi");
              this.errorFlag = true;
              alert(error.toString());
            });

          if(errorFlag === false){

            //Set a localStorage object from response.
            console.log("UHIU-------");
            //Re-route to new profile
            this.$router.push({ name: 'home'})

          }

        } else {

          alert(errorMsg);

        }
      },

      validation() {

        let usernameValid = this.form.username.length > 0 && this.form.username.length < 65;
        if(!usernameValid){
          return "Username must be between 1-64 chars inclusive."
        }

        let emailValid = this.validateEmail(this.form.email);
        if(!emailValid){
          return "Invalid email."
        }

        if(this.form.password !== this.form.password2) {
          return "Passwords don't match!"
        }

        if(this.form.password.trim() === ""){
          return "Please enter a non-empty password"
        }

        return "";
      },

      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    }
  }
</script>
