<template lang="">
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <io/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import io from '@/components/test/socket-io'
export default {
  components: {
    io
  }
}
</script>
<style lang="">
  
</style>