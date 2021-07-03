<template>
  <v-layout column>
    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>NuxtJS에서 제공하는 key 속성?</v-card-title>
            <v-card-text>
              key(route) 속성 선언해서 사용 ㅇㅇ
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>nuxt.config.js globalName</v-card-title>
            <v-card-text>
              globalName Test..
              <v-text-field id="test"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-spacer/>
              <v-btn @click="test1">test</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      what_key : null,
    }
  },
  key(route) {
    console.log('component in key', route);
  },
  watch: {
    $route(route) {
      console.log('component in watch route : ', route);
    }
 },
 methods: {
   test1() {
     console.log('test1 btn');
     const test = __$('test');
     console.log(test);
   }
 }
}
</script>

<style>

</style>