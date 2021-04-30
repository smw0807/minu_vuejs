<template>
  <v-overlay :value="overlay" z-index="10000"></v-overlay>
    <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props:['overlay']
}
</script>

<style>

</style>