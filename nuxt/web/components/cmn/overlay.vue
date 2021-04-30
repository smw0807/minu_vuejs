<template>
  <v-overlay :value="overlay" z-index="10000">
    <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    overlay() {
      return this.$store.getters['GET_OVERLAY'];
    }
  }
}
</script>

<style>

</style>