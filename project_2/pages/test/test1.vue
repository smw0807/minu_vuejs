<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>Component Test</v-card-title>
          <v-card-text>
            <!-- <com1/> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { default as com1 } from '~/components/test'
const com1 = {
  template: '<div> test com1 </div>'
}
export default {
  components: { 
    com1
   },

}
</script>

<style>

</style>