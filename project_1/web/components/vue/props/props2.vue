<template>
  <v-card outlined>
    <v-card-title>props function</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="data2"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'sensor_id', value: 'sensor_id'},
        { text: 'in_byte', value: 'in_byte'},
        { text: 'out_byte', value: 'out_byte'},
      ]
    }
  },
  computed: { //전달된 props를 바꾸어야할 경우 computed를 사용하는 것이 좋음!!!!!
    data2() {
      return this.test(this.data);
    }
  },
  methods: {
    test(v) {
      console.log('test : ', v);
      for (let item of v) {
        if(item.sensor_id) {
          item.sensor_id = item.sensor_id + '번 장비'
        }
      }
      return v;
    }
  },
}
</script>

<style>

</style>