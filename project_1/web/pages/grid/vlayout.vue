<template>
    <v-layout column>
      <v-flex class="mt-4 ml-9">
        <v-row>
          <!-- v-card-title이랑 비슷함 -->
          <v-col cols="12" align="start">
            <h2>v-layout grid</h2>
          </v-col>
        </v-row>
      </v-flex>

      <v-flex class="ma-4">
        <v-row class="px-4">
          <v-col cols="6">
            <test/>
          </v-col>
        </v-row>
        <v-row class="px-4">
          <v-col>
            <test/>
          </v-col>
        </v-row>
      </v-flex>

      <v-flex class="ma-4">
        <v-row class="px-4">
          <v-col cols="6">
            <test/>
          </v-col>
          <v-col cols="6">
            <test/>
          </v-col>
        </v-row>
        <v-row class="px-4">
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