<template>
  <v-card outlined>
    <v-card-title>props function test</v-card-title>
    <v-card-subtitle>컴포넌트 props function 처리 테스트</v-card-subtitle>
    <v-card-text>
      <props2 :data="format"/>
    </v-card-text>
  </v-card>
</template>

<script>
import props2 from '@/components/vue/props/props2'
export default {
  components: {
    props2
  },
  data() {
    return {
      format: [
        { 
          "in_byte": 2153,
          "in_byte_max": 1300,
          "in_byte_min": 0,
          "in_flow": 6,
          "in_pkt": 15,
          "in_pkt_max": 5,
          "in_pkt_min": 1,
          "n_org": 999,
          "out_byte": 1624,
          "out_byte_max": 1029,
          "out_byte_min": 0,
          "out_flow": 5,
          "out_pkt": 9,
          "out_pkt_max": 3,
          "out_pkt_min": 0,
          "sensor_id": 1
        },
        {
          "aggr_date": "20211120",
          "cps": 5,
          "e_port": 28875,
          "in_byte": 2014,
          "in_byte_max": 1246,
          "in_byte_min": 0,
          "in_flow": 5,
          "in_pkt": 14,
          "in_pkt_max": 5,
          "in_pkt_min": 0,
          "n_org": 999,
          "out_byte": 1649,
          "out_byte_max": 963,
          "out_byte_min": 60,
          "out_flow": 6,
          "out_pkt": 9,
          "out_pkt_max": 2,
          "out_pkt_min": 1,
          "sensor_id": 1,
        }
      ]
    }
  }
}
</script>

<style>

</style>