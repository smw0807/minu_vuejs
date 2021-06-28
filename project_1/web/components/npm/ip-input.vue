<template>
  <v-card>
    <v-card-title>vue-ip-input</v-card-title>
    <v-card-text>
      <ip-input/>
    </v-card-text>
  </v-card>
</template>

<script>
import vueIpInput from 'vue-ip-input'
const ip = {
  components:{
    vueIpInput
  },
  data() {
    return {
      ip: '127.0.0.1'
    };
  },
  methods: {
    onIpChange(ip) {
      console.log('ip input change:', ip);
    },
    onIpBlur(ip) {
      console.log('ip input blur:', ip);
    }
  },
  template: '<vue-ip-input :ip="ip" :on-change="onIpChange" :on-blur="onIpBlur"></vue-ip-input>'
}
export default {
  components:{
    'ipInput' : ip
  }
}
</script>

<style>

</style>