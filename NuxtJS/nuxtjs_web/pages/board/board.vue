<template>
  <div>
    <h2>게시판1</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>year</th>
          <th>Director</th>
          <th>poster</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in list" :key="row.id" @click="showDetail(row.id)">
          <td>{{row.id}}</td>
          <td>{{row.name}}</td>
          <td>{{row.year}}</td>
          <td>{{row.director}}</td>
          <td><img :src="row.poster"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'main',
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
    }
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