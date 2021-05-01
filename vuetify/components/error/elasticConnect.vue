<template>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      type="error"
    >
      {{text}}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      color: '',
      mode: '',
      snackbar: true,
      text: 'Hello, I\'m a snackbar',
      timeout: 6000,
      x: 'right',
      y: 'top',
    }
  }
}
</script>

<style>

</style>