<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <test/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
  
</template>

<script>
import test from '~/components/test/resizeTest'
export default {
  components:{
    test
  },
}
</script>

<style>

</style>