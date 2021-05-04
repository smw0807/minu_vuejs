<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3" min-height="700">
        <test/>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import test from '~/components/api/test'
export default {
  data() {
    return {
      pageName : 'API Test Page',
    }
  },
  components: {
    test
  }
}
</script>

<style>

</style>