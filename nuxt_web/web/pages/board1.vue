<template>
  <div>
    <h1>board1</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>Year</th>
          <th>Name</th>
          <th>Director</th>
          <th>poster</th>
        </tr>
      </thead>
      
    </table>
  </div>
</template>

<script>
export default {
//   data () {
//   },
//   created() {
    // this.$store.dispatch('initBoardList');
//   },
//   computed: {
    // list() {
    //   return this.$store.getters.boardList;
    // }
//   },
//   methods: {
    // test() {
    //   this.$store.dispatch('initBoardList');
    // }
//   }
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