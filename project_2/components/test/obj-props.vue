<template>
  <v-card>
    <v-card-title>component test</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-responsive :aspect-ratio="16/8">
        <v-row align="center">
          <v-col cols="12">
            Test!!
          </v-col>
        </v-row>
      </v-responsive>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  //------- 1. undefined
  // props: {
  //   obj: { type: Object, default: () => {} }
  // },

  //------- 2. undefined
  // props: {
  //   obj: { type: Object, default: (v) => {console.log(v)} }
  // },

  //------- 3. undefined
  // props: {
  //   obj: { type: Object, default: function (v) {console.log(v)} }
  // },

  //------- 4. undefined
  // props: {
    //   obj: { type: Object }
  // },

  //------- 5. ok
  // props: {
  //   obj: { type: Object, default: function () { 
  //     return {
  //       a: '',
  //       b: '',
  //       c: {},
  //       d: []
  //     }
  //   } }
  // },

  //------- 6. ok
  props: {
    obj: { type: Object, default: () => { return {}} }
  },

  created() {
    console.log('created : ', this.obj)
  },
  mounted() {
    console.log('mounted : ', this.obj);
  },
}
</script>

<style>

</style>