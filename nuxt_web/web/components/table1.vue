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
    name: 'table1',
    props: ['list'],
    
}
</script>

<style>

</style>