<template>
  <v-bottom-navigation
    v-model="bottomNav"
    dark
  >
  
    <v-btn :href="`https://github.com/smw0807`" target="_blank">
      <span>GitHub</span>
      <v-icon>mdi-github</v-icon>
    </v-btn>

    <v-btn :href="`https://minu0807.tistory.com/`" target="_blank">
      <span>Tstory</span>
      <v-icon>mdi-alpha-t-circle</v-icon>
    </v-btn>

    <v-btn :href="`https://www.instagram.com/s_minu92/`" target="_blank">
      <span>Instagram</span>
      <v-icon>mdi-instagram</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
      return {
        bottomNav: 5,
      }
    },
}
</script>

<style>

</style>