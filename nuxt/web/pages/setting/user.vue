<template>
  <v-layout column>

    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>{{ pageName }}</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4" style="overflow:auto">
      <v-row class="px-4">
        <v-col cols="12">
          <v-card raised outlined class="pa-3">
            <list-table :list="list"/>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import listTable from '~/components/setting/user/listTable'
export default {
  layout:'setting',
  components: {
    listTable,
  },
  data() {
    return {
      pageName: '사용자 관리'
    }
  },
  created() {
    //사용자 리스트 불러오기
    this.$store.dispatch('setting/user/initUserList');
  },
  computed: {
    list() {
      return this.$store.getters['setting/user/GET_USER_LIST'];
    }
  }
}
</script>

<style>

</style>