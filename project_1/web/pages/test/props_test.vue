<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <test :test="test"/>
        </v-col>
      </v-row>
    </v-flex>

  
  </v-layout>
  
</template>

<script>
import test from '~/components/test/props'
export default {
  components:{
    test
  },
  data(){
    return {
      test: null
    }
  }
}
</script>

<style>

</style>