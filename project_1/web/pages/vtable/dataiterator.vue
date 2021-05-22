<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3">
        <vtable></vtable>
      </v-card>
    </v-card-text>
  </v-card>
  <!-- <v-layout column justify-center align-center>
    <v-flex>
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <vtable/>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout> -->
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