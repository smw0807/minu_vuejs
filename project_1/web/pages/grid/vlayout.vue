<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="6">
          <test/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <test/>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="6">
          <test/>
        </v-col>
        <v-col cols="6">
          <test/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <test/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
  
</template>

<script>
import test from '~/components/api/test'
export default {
  components:{
    test
  }
}
</script>

<style>

</style>