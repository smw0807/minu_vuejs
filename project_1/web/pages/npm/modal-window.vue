<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <comp/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import comp from '@/components/npm/modal/modal-window'
export default {
  components: {
    comp
  }
}
</script>

<style>

</style>