<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <grid></grid>
        </v-col>
      </v-row>
    </v-flex>
    
  </v-layout>
</template>

<script>
import grid from '~/components/slimgrid/grid1'
export default {
  components: {
    grid
  }
}
</script>

<style>

</style>