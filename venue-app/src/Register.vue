<template>
  <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">

    <p><strong>Register to VenueHub</strong></p>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-5"
          v-model="form.fname"
          required
          placeholder="First name"
        ></b-form-input>        <b-form-input
          id="input-4"
          v-model="form.lname"
          required
          placeholder="Last name"
        ></b-form-input>        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          type="password"
          placeholder="Password"
        ></b-form-input>


        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          type="password"
          placeholder="Repeat password"
        ></b-form-input>

      </b-form-group>

      </b-form>

      <!--<b-button type="submit" variant="primary">Submit</b-button>-->

    <!--<b-form style="padding-bottom: 9px; padding-top: 9px">-->
      <!--<b-input :v-model="form.fname" placeholder="First name"></b-input>-->
    <!--</b-form>-->

    <!--<b-form style="padding-bottom: 9px; padding-top: 2px">-->
      <!--<b-input :v-model="form.lname" placeholder="Last name"></b-input>-->
    <!--</b-form>-->

      <!--<b-form style="padding-bottom: 9px; padding-top: 2px">-->
        <!--<b-input :v-model="form.username" placeholder="Username"></b-input>-->
      <!--</b-form>-->

    <!--<b-form style="padding-bottom: 5px; padding-top: 2px">-->
      <!--<b-input-->
        <!--id="input-1"-->
        <!--:v-model="form.email"-->
        <!--type="email"-->
        <!--required-->
        <!--placeholder="Email"-->
      <!--&gt;</b-input>-->
    <!--</b-form>-->




    <!--<b-form-group-->
      <!--id="input-group-1"-->
      <!--label-for="input-1"-->
      <!--description="We'll never share your email with anyone else."-->
    <!--&gt;-->
    <!--</b-form-group>-->

    <!--<b-form style="padding-bottom: 5px;">-->
        <!--<b-input :v-model="form.password" type="password"  required placeholder="Password"></b-input>-->
      <!--</b-form>-->




    <!--<b-form-group id="input-group-2">-->

    <!--</b-form-group>-->

    <b-button type="submit" variant="primary">Submit</b-button>

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
        },

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"

      }
    },
    computed: {
      validation() {
        return this.form.username.length > 0 && this.form.username.length < 65
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>
