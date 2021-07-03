<template>
  <v-layout column>
    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>NuxtJS에서 제공하는 key 속성?</v-card-title>
            <v-card-text>
              ??
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
}
</script>

<style>

</style>