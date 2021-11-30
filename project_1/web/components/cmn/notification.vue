<template>
  <v-snackbar
      v-model="snackbar"
      timeout="2000"
      top
      right
      >
      {{text}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
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
  computed: {
    show() {
      
    }
  }
}
</script>

<style>

</style>