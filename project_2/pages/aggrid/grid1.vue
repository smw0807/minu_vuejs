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
            <list/>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import list from '~/components/aggrid/list'
export default {
  created() {
    // this.$store.dispatch('threat/monitoring/initList');
  },
  data() {
    return {
      pageName : '무한 스크롤링 그리드'
    }
  },
  components: {
    list
  }
}
</script>

<style>

</style>