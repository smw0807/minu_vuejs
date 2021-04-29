<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3" min-height="700">
        <ex1/>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ex1 from '~/components/ex/ex1/ex1-1'
export default {
  data() {
    return {
      pageName: '예제 1',
    }
  },
  components: {
    ex1
  }
}
</script>

<style>

</style>