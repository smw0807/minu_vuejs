<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="listData"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
      :search="search"
      align="center"
      >
      <template v-slot:[`item.poster`]="{ item }">
        <img :src="item.poster">
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  props:['list'],
  data() {
    return {
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: 'ID', value: 'id', align: 'center', sortable: false},
        { text: '제목', value: 'name', align: 'center' },
        { text: '개봉연도', value: 'year', align: 'center' },
        { text: '감독', value: 'director', align: 'center' },
        { text: '포스터', value: 'poster', align: 'center' }
      ]
    }
  },
  computed: {
    listData() {
      return this.list;
    }
  }
}
</script>

<style>

</style>