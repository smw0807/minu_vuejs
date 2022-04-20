<template lang="">
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <web-socket/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import webSocket from '@/components/test/websocket'
export default {
  components: {
    webSocket
  }
}
</script>
<style lang="">
  
</style>