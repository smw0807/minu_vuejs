<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <date-picker/>
        </v-col>
      </v-row>
    </v-flex>
    
  </v-layout>
</template>

<script>
import datePicker from '~/components/vpicker/datepicker'
export default {
  components: {
    datePicker
  }
}
</script>

<style>

</style>