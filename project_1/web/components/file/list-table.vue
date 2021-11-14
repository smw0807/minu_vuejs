<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">파일 리스트</v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="list"
              :page.sync="page"
              :item-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              :search="search"
              height="550"
              :loading="loading"
              loading-text="데이터를 불러오는 중입니다."
              no-data-text="데이터가 없습니다."
            ></v-data-table>
            <div class="text-center">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      search :'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text : '파일명', value : 'file_name' },
        { text : '파일크기', value : 'file_size' },
        { text : '등록일', value : 'file_mk_dt' },
        { text : '-', value : 'actions' }
      ]
    }
  },
  async created() {
    await this.$store.dispatch('file/initList', {});
  },
  computed: {
    loading() {
      return this.$store.getters['GET_LOADING_1'];
    },
    list() {
      return this.$store.getters['file/GET_LIST'];
    }
  }
}
</script>

<style>

</style>