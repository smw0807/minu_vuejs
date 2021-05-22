<template>
  <v-card>
    <v-card-title>v-card grid</v-card-title>
    <v-card-text>
      <!-- <test/> -->
      <v-row class="pa=5">
        <v-col cols="6">
          <test/>
        </v-col>
        <v-col>
          <test/>
        </v-col>
      </v-row>
      <v-row class="pa=5">
        <v-col cols="12">
          <test/>
        </v-col>
        <v-col>
          <test/>
        </v-col>
      </v-row>
      <v-row class="pa=5">
        <v-col cols="6">
          <test/>
        </v-col>
        <v-col>
          <test/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import test from '~/components/api/test'
export default {
  components:{
    test
  }
}
</script>

<style>

</style>