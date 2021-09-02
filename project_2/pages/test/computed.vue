<template>
  <v-container fluid>
    <v-layout column class="ma-1">
      <v-row>
        <v-col cols="12">
          <c1/>
        </v-col>
        <v-col cols="12">
          <c2/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import c1 from '@/components/test/computed1'
import c2 from '@/components/test/computed2'
export default {
  components:{
    c1, c2
  }
}
</script>

<style>

</style>