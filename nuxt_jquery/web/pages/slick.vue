<template>
  <v-layout column>
    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>jQuery slick.grid.js</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <slick/>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import slick from '~/components/slick'
export default {
  components:{
    slick
  }
}
</script>

<style>

</style>