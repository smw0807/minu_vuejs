<template>
  <div>
    <h1>board2</h1>
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
  name: 'board2',
  data () {
    return {
      list: []
    }
  },
  created() {
   this.$Axios.get('/v1/movies').then(res => {
      if (res.status == 200) {
        this.list = res.data;
      }
    })
    .catch(err => {
      console.log('board list error : ', err);
    })
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