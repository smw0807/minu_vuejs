<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3">
        <v-row no-gutters>
          <v-col cols="4">
            <ex2/>
          </v-col>

          <v-col cols="4" offset-md="4">
            <ex22/>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ex2 from '~/components/ex/ex2/ex2-1'
import ex22 from '~/components/ex/ex2/ex2-2'
export default {
  data() {
    return {
      pageName: '예제 2',
    }
  },
  components: {
    ex2,
    ex22
  }
}
</script>

<style>

</style>