<template>
  <v-card raised outlined min-height="900">
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
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  props:['headers', 'list'],
  data() {
    return {
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
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