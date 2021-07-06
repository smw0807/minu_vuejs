<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <!-- <datatables :list="list"/> -->
          <datatables2/>
          <!-- <datatables3/> -->
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import datatables from '@/components/vtable/datatables'
import datatables2 from '@/components/vtable/datatables2'
import datatables3 from '@/components/vtable/datatables3'
export default {
  data() {
    return {
      title: 'Vuetify DataTables',
    }
  },
  components: {
    datatables,
    datatables2,
    datatables3
  },
  async created() {
    //최초 데이터 생성
    // await this.$store.dispatch('datatables/initList');
  },
  computed: {
    // list() {
    //   return this.$store.getters['datatables/GET_LIST'];
    // }
  }
}
</script>

<style>

</style>