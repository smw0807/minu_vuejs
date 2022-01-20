/**
https://github.com/moritanian/vue-modal-window
 */
<template>
  <div>
    <vue-modal-window 
      title="" 
      :draggable="true" 
      :resizable="true" 
      :visible.sync="open1">
      <v-card>
        <v-card-title>ssss</v-card-title>
        <v-card-text>
          sdfsdfsdf
        </v-card-text>
      </v-card>
      </vue-modal-window>
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
  </div>
</template>

<script>
import VueModalWindow from 'vue-modal-window';
export default {
  components: {
    VueModalWindow
  },
  data() {
    return {
      open1: false,
      md_title: 'modal title?'
    }
  },
  methods:{
    open() {
      console.log('open');
      this.open1 = true;
    }
  }
}
</script>

<style>

</style>