<template>
  <v-overlay :value="loading" z-index="10000">
    <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
}
</script>

<style>

</style>