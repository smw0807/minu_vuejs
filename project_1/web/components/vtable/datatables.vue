<template>
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
        height="600"
        :loading="loading"
        loading-text="데이터를 불러오는 중입니다."
        no-data-text="데이터가 없습니다."
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: 'Date', value: 'detectionDateTime' },
        { text: 'attackIP', value: 'attackIp' },
        { text: 'attackPort', value: 'attackPort' },
        { text: 'victimIp', value: 'victimIp' },
        { text: 'victimPort', value: 'victimPort' },
        { text: 'detectCnt', value: 'detectionCount' }
      ],
      list: []
    }
  },
  coumputed: {
    loading() {
      return this.$store.getters['GET_LOADING_1'];
    },
  }
}
</script>

<style>

</style>