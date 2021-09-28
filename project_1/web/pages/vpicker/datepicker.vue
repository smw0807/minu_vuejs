<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <date-picker/>
        </v-col>
        <v-col cols="12">
          <date-time/>
        </v-col>
        <v-col cols="12">
          <picker/>
        </v-col>
      </v-row>
    </v-flex>
    
  </v-layout>
</template>

<script>
import datePicker from '~/components/vpicker/datepicker'
import dateTime from '~/components/vpicker/datetime'
import picker from '~/components/vpicker/picker'
export default {
  components: {
    datePicker,
    dateTime,
    picker,
  }
}
</script>

<style>

</style>