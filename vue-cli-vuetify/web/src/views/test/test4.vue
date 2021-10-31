<template>
  <v-container fluid>
    <v-layout>
      <v-row>
        <v-col cols="12">
          <comp1/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import comp1 from '@/components/download/comp1'
export default {
  components:{
    comp1
  }
}
</script>

<style>

</style>