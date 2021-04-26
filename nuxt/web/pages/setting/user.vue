<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <list-table :list="list"/>
    </v-card-text>
  </v-card>
</template>

<script>
import listTable from '~/components/setting/user/listTable'
export default {
  layout:'setting',
  auth: false,
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