<template>
  <v-card dark :width="card.width">
    <v-responsive :aspect-ratio="16/9">
      <v-card-title>Vuetify test</v-card-title>
      <v-card-text>
        Vuetify Card test
      </v-card-text>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      card:{
        width: '100%'
      }
    }
  }
}
</script>

<style>

</style>