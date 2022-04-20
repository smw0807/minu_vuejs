<template lang="">
  <v-layout column>
    <v-row>
      <v-col cols="6">
        <v-card outlined height="500">
          <v-card-title>웹 소켓</v-card-title>
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
      websocket : null
    }
  },
  created() {
    this.makeWS();
  },
  mounted() {
    
  },
  watch: {
    websocket(v) {
      console.log('websocket : ', v);
    }
  },
  methods: {
    makeWS() {
      if (this.websocket === null) {
        // const ws = new WebSocket('ws://localhost:');
        this.websocket = new WebSocket('ws://localhost:8081');
        this.websocket.onopen = () => {
          console.log('웹 소켓 연결 성공!!');
        }
        this.websocket.onmessage = (msg) => {
          console.log(msg.data);
          this.websocket.send('nuxt에서 웹소켓 서버로 메세지 전달.');
        }
        this.websocket.onerror = (err) => {
          console.error('웹솤세 에러 : ', err);
        }
        this.websocket.onclose = () => {
          console.warn('웾소켓 닫힘')
        }
        // ws.on
      }
    }
  },
}
</script>
<style lang="">
  
</style>