<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          
          <v-card color="red">
            <v-card-text>AAA</v-card-text>
          </v-card>

          <v-card class="my-1" color="blue" v-show="is">
            <v-card-text>BBB1</v-card-text>
          </v-card>

          <v-card class="my-1" color="blue" v-if="is">
            <v-card-text>BBB2</v-card-text>
          </v-card>

          <v-card color="purple">
            <v-card-text>CCC</v-card-text>
          </v-card>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="is = !is">Button</v-btn>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      is : false
    }
  }
}
</script>

<style>

</style>