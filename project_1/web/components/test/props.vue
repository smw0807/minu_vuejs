<template>
  <v-card>
    <v-card-title>props test</v-card-title>
    <v-card-text>
      {{test}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props:{
    test: {
      type: String,
      required: true
    }
  },
  // props: ['test'],
  data() {
    return {
      tt : null
    }
  },
  created() {
    console.log('test : ', this.test);

  }
}
</script>

<style>

</style>