<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <directive1/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <directive2/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import directive1 from '@/components/vue/directive/directive1'
import directive2 from '@/components/vue/directive/directive2'
export default {
  components: {
    directive1,
    directive2
  }
}
</script>

<style>

</style>