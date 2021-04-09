<template>
  <v-card>
    <v-card-title>
      <h2>Board</h2>
    </v-card-title>
    <v-card-text>
      <list-table :list="list"></list-table>
    </v-card-text>
  </v-card>
</template>

<script>
import listTable from '~/components/board/listTable'

export default {
  created() {
    this.$store.dispatch('board/initBoardList');
  },
  computed: {
    list() {
      return this.$store.getters['board/GET_BOARD_LIST']; 
    }
  },
  methods: {
    showDetail(id) {
      console.log('showDetail : ', id);
      this.$router.push(`${id}`);
    }
  },
  components: {
    listTable
  }
}
</script>

<style scope>
img {
  width: 100px;
  height: 100px;
}
th, td {
  text-align: center;
  vertical-align: middle !important; 
}
</style>