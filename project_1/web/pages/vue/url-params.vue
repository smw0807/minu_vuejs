<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-btn @click="test1">test1</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn @click="test2">test2</v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    test1() {
      this.$router.push('/vue/url-params?a=aa');
    },
    test2() {
      this.$router.push('/vue/url-params?b=bb')
    }
  }
}
</script>

<style>

</style>