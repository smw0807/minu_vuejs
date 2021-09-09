<template>
  <v-layout column>
    <v-row>
      <v-col cols="6">
        <v-card outlined height="500">
          <v-card-title>v-card 1</v-card-title>
          <v-card-text>
            <pre>aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              aaaaaaaaaaa
              </pre>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined :height="resize_height - 180">
          <v-card-title>v-card 2</v-card-title>
          <v-card-text>
            bbbbbbbbbbbbb
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { resize } from '@/components/mixin/resize'
export default {
  mixins: [resize],
  data(){
    return {
      test_name: 'resize mixin!!'
    }
  },
  created() {
    console.log('created!');
  },
  methods: {
    btn() {
      console.log('btn click!!');
    }
  }
}
</script>

<style>

</style>