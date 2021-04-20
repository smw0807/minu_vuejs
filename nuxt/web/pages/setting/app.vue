<template>
  <v-card>
    <v-card-title>
      <h2>응용 관리</h2>
    </v-card-title>
    <v-card-text>
      <list-table/>
    </v-card-text>
  </v-card>
</template>

<script>
import listTable from '~/components/setting/app/listTable'
export default {
  layout:'setting',
  components: {
    listTable,
  },
  data() {
    return {
    }
  },
  created() {
    // this.$store.dispatch('setting/user/initUserList');
  },
  computed: {
    // list() {
    //   return this.$store.getters['setting/user/GET_USER_LIST'];
    // }
  }
}
</script>

<style>

</style>