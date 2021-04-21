<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <vuetify2/>
    </v-card-text>
  </v-card>
</template>

<script>
import vuetify2 from '~/components/vuetify/vuetify2'
export default {
  data() {
    return {
      pageName: 'Vuetify2'
    }
  },
  components:{
    vuetify2
  }
}
</script>

<style>

</style>