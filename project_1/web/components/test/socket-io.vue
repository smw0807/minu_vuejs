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
        name: 'main',
        channel: '/run1', //웹소켓 서버에서 네임스페이스를 주지 않을 경우 그냥 / 만 넣으면됨
        persist: true,
        emitTimeout: 1000
      })
      this.socket.on('news', (msg, cb) => {
        console.log('socket.io로부터 받은 메시지 : ', msg);
        this.socket.emit('nuxt', 'nuxt에서 보냄...')
      })
    }
  }
}
</script>
<style lang="">
  
</style>