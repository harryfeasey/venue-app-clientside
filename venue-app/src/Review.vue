<template>
  <div v-if="this.$cookies.get('userToken') != null" v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight, padding: pad}">
    <p><strong>Post a Review: </strong></p>
    <b-form>
      <b-form-group
        id="input-group-1"
        description="Write something constructive."
      >
        <b-form-input style="height: 15%; padding-bottom: 25%;"
          id="input-1"
          v-model="form.body"
          required
          placeholder="Body..."
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Star Rating">
        <b-form-radio-group
          id="btn-radios-4"
          v-model="form.stars"
          :options=minStarsOptions
          buttons
          button-variant="outline-primary"
          name="radio-btn-stacked"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group label="Cost Rating">
        <b-form-radio-group
          id="btn-radios-3"
          v-model="form.cost"
          :options="maxCostOptions"
          buttons
          button-variant="outline-primary"
          name="radio-btn-stacked"
        ></b-form-radio-group>
      </b-form-group>


      <b-button type="submit" v-on:click.prevent="submit(form)" variant="primary">Submit</b-button>
    </b-form>
  </div>
  <div v-else>
    <p>
      Not authenticated.
    </p>

  </div>
</template>
<script>
  export default {
    data() {
      return{
        form: {
          body: null,
          stars: null,
          cost: null
        },

        maxCostOptions: [
          {text: '0 Free ', value: 0},
          {text: '1 Low', value: 1},
          {text: '2 Med', value: 2},
          {text: '3 High', value: 3},
          {text: '4 Max', value: 4},
        ],
        minStarsOptions:
        [
          {text: '1 Star', value: 1},
          {text: '2 Stars', value: 2},
          {text: '3 Stars', value: 3},
          {text: '4 Stars', value: 4},
          {text: '5 Stars', value: 5},
        ],

        bgColor: 'white',
        bgWidth: '60%',
        bgHeight: '30px',
        pad: "2% 10% 2% 10%"



      }
    },


    methods: {

      submit(form) {
        this.$router.push({name: 'venues'})
      }

    }
  }




</script>


