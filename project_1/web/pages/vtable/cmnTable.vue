<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col align="end" cols="12"> <Edit @refresh="refresh" /> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table
            :headers="headers"
            :data="list"
            :DataLoading="DataLoading"
            @select-row="row"
            @del-row="delRow"
          />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Edit from '@/components/vtable/cmnTable/Edit';
import Table from '@/components/vtable/cmnTable/Table';
export default {
  components: {
    Edit,
    Table,
  },
  data: () => ({
    headers: [
      { text: '작성자', value: 'user_nm', width: '20%' },
      { text: '코멘트', value: 'comments' },
      { text: '삭제', value: 'btnDelete', width: '20%' },
    ],
    DataLoading: false,
  }),
  computed: {
    list() {
      return this.$store.getters['datatables/list'];
    },
  },
  async created() {
    await this.getList();
  },
  methods: {
    async getList() {
      this.DataLoading = true;
      try {
        await this.$store.dispatch('datatables/GuestBookList', {});
      } catch (err) {
        console.error(err);
      }
      this.DataLoading = false;
    },
    refresh() {
      this.getList();
    },
    row(v) {
      console.log(v);
    },
    delRow(v) {
      console.log(v);
    },
    async insert(v) {
      console.log(v);
    },
  },
};
</script>

<style>
</style>