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
      <tbody>
        <tr v-for="data in list" :key="data.id">
          <td>{{data.id}}</td>
          <td>{{data.year}}</td>
          <td>{{data.name}}</td>
          <td>{{data.director}}</td>
          <td><img :src="data.poster"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'board1',
  data () {
    return {
    }
  },
  created() {
    this.$store.dispatch('initBoardList');
  },
  computed: {
    list() {
      return this.$store.getters.boardList;
    }
  },
  methods: {
    test() {
      this.$store.dispatch('initBoardList');
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