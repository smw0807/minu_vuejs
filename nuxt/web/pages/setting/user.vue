<template>
  <v-card>
    <v-card-title>
      <h2>사용자 관리</h2>
    </v-card-title>
    <v-card-text>
      <list-table :list="list">
        <edit-user slot="edit_button"/>
      </list-table>
    </v-card-text>
  </v-card>
</template>

<script>
import listTable from '~/components/setting/user/listTable'
import editUser from '~/components/setting/user/editUser'
export default {
  layout:'setting',
  components: {
    listTable,
    editUser
  },
  data() {
    return {
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