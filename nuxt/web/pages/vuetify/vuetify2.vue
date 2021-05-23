<template>
  <v-layout column>

    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>{{ pageName }}</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <v-card raised outlined class="pa-3">
            <vuetify2/>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
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