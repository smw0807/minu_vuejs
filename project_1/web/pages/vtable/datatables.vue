<template>
  <v-layout column>
    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>{{ title }}</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <datatables :list="list"/>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
  <!-- <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3" min-height="700">
        <datatables :list="list"/>
      </v-card>
    </v-card-text>
  </v-card> -->
</template>

<script>
import datatables from '@/components/vtable/datatables'
export default {
  data() {
    return {
      title: 'Vuetify DataTables',
    }
  },
  components: {
    datatables
  },
  created() {
    //최초 데이터 생성
    this.$store.dispatch('datatables/initList');
  },
  computed: {
    list() {
      return this.$store.getters['datatables/GET_LIST'];
    }
  }
}
</script>

<style>

</style>