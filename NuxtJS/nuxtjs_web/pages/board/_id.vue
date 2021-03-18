<template>
  <div>
    <h1>[{{row.name}}] 상세 화면</h1>
    {{ row }}
    <nuxt-link class="btn btn-primary" :to="{path: '/board/board'}">목록</nuxt-link>
  </div>
</template>

<script>
export default {
  layout:'main',
  asyncData({$axios, misDev, route, store, env, params, query, req, res, redirect, error}) {
    return $axios.get('/data/movies.json').then(rs => {
      let id = params.id;
      let data = rs.data;
      let row = data.filter(function (movie) { return movie.id == id  });
      return {
        row: row[0]
      }
    })
  },
}
</script>

<style>

</style>