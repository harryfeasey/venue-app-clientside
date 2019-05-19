<template>
  <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">
      <p><strong>Login to VenueHub</strong></p>
      <b-form @submit="onSubmit" @reset="onReset">
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
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>


        <b-button type="submit" variant="primary">Submit</b-button>
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
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>
