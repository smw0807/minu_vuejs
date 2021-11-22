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
          "out_byte": 1624,
          "sensor_id": '1'
        },
        {
          "in_byte": 2014,
          "out_byte": 1649,
          "sensor_id": '1',
        }
      ]
    }
  }
}
</script>

<style>

</style>