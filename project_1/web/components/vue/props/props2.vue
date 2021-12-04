<template>
  <v-card outlined>
    <v-card-title>props function</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="dataChange"
      ></v-data-table>
    </v-card-text>
    <v-card-text>
      {{test3}}
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
      ],
      test3: {
        type: Object,
        default: null
      }
    }
  },
  computed: { //전달된 props를 바꾸어야할 경우 computed를 사용하는 것이 좋음!!!!!
    dataChange() {
      return this.test(this.data);
    }
  },
  methods: {
    test(v) {
      console.log('test : ', v);
      const d = v[0];
      console.log(d);
      this.test3 = d;
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