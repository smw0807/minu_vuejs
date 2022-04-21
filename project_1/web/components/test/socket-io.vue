<template lang="">
  <v-layout column>
    <v-row>
      <v-col cols="6">
        <v-card outlined height="500">
          <v-card-title>Socket IO</v-card-title>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      socket : null,
      msg : null
    }
  },
  created() {
  },
  mounted() {
    this.makeIO();
    
  },
  methods: {
    makeIO() {
      this.socket = this.$nuxtSocket({
        channel: '/socket.io',
        emitTimeout: 1000
      })
      console.log(this.socket);
     
      this.socket.on('news', (msg, cb) => {
        console.log('socket.io로부터 받은 메시지 : ', msg);
        console.log('cb?? ', cb);
      })
        // this.socket.emit('reply', {
        //   reply: 'This is Nuxt message'
        // }, (resp) => {
        //   console.log('resp : ', resp);
        // })

      }
    }
}
</script>
<style lang="">
  
</style>