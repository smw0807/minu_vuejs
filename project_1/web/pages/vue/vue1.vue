<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <directive1/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import directive1 from '@/components/vue/directive/directive1'
export default {
  components: {
    directive1
  }
}
</script>

<style>

</style>