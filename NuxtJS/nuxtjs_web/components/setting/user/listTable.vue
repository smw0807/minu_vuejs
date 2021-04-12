<template>
  <v-card raised outlined class="pa-3" min-height="900">
    <v-card-title>
      <v-spacer></v-spacer>
      <slot name="edit_button"></slot>
    </v-card-title>
    <v-card-title>
      Vuetify DataTables Test
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
        :items="listData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        :search="search"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props:["list"],
  data() {
    return {
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [ //props로 받아서 처리하게끔 변경해보기
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
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