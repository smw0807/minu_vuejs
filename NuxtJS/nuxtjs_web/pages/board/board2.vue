<template>
  <v-card>
    <v-card-title>
      <h2>Board2</h2>
    </v-card-title>
    <v-card-text>
      <list-table :headers="headers" :list="list"></list-table>
    </v-card-text>
  </v-card>
</template>

<script>
import listTable from '~/components/commons/listTable'
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', align: 'center', sortable: false},
        { text: '제목', value: 'name', align: 'center' },
        { text: '개봉연도', value: 'year', align: 'center' },
        { text: '감독', value: 'director', align: 'center' },
        { text: '포스터', value: 'poster', align: 'center' }
      ]
    }
  },
  created() {
    this.$store.dispatch('board/initBoardList');
  },
  computed: {
    list() {
      return this.$store.getters['board/GET_BOARD_LIST']; 
    }
  },
  methods: {
  },
  components: {
    listTable
  }
}
</script>

<style>

</style>