<template>
  <v-layout column>
    
    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>{{ title }}</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <vtable></vtable>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import vtable from '~/components/vtable/dataiterator'
export default {
  data() {
    return {
      title: 'Vuetify dataiterator'
    }
  },
  components:{
    vtable
  }
}
</script>

<style>

</style>