<template>
  <v-card outlined>
    <v-card-title>props function</v-card-title>
    <v-card-text>
      {{data}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: (v) => {
        console.log('props!!', v);
        return this.test(v);
      }

    }
  },
  methods: {
    test(v) {
      console.log('test : ', v);
      // for (let item of v) {
      //   if (item.sensor_id) {
      //      item.sensor_id = "1번장비!!" 
      //   }
      // }
      return v;
    }
  },
}
</script>

<style>

</style>