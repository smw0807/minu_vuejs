<template>
  <v-container lg12>
    <v-layout>
      <v-flex> 
        <tabs/>
      </v-flex>
      <v-flex>
        <tabs/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tabs from '~/components/vuetify/tabs'
export default {
  components: {
    tabs 
  }
}
</script>

<style>

</style>