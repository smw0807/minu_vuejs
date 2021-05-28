<template>
<!-- 작업자:임지연 -->
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
            <checkbox-table :list="list"/>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import checkboxTable from '~/components/equipment/manage/checkbox';
export default {
  layout:'manage',
  components: {
    checkboxTable
  },
  data() {
    return {
      pageName : '수집 장비 관리',
      list: [],
    }
  },
  created() {
  },
  computed: {
    // list(){
    // }
  }
}
</script>

<style>

</style>