<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <test1/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <test2/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import test1 from '@/components/csv/csv_worker/test1'
import test2 from '@/components/csv/csv_worker/test2'
export default {
  components: {
    test1, test2
  }
}
</script>

<style>

</style>