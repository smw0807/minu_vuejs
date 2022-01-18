<template>
  <v-card>
    <v-card-title>vue-modal-window</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-row>
          <v-col cols="2">
            <v-btn @click="open">modal open</v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods:{
    open() {
      console.log('open');
    }
  }
}
</script>

<style>

</style>