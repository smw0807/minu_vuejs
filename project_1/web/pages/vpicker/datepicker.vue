<template>
  <v-layout column>
    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>v-date-picker</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="6">
          <date-picker/>
        </v-col>
      </v-row>
      <v-row class="px-4">
        <v-col>
          
        </v-col>
      </v-row>
    </v-flex>
    
  </v-layout>
</template>

<script>
import datePicker from '~/components/vpicker'
export default {
  components: {
    datePicker
  }
}
</script>

<style>

</style>