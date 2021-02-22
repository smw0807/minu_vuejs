<template>
  <div>
    <h3>{{msg}}</h3>
    <p>{{need}}</p>
    <div v-if="$route.params.is_login">
      <p>환영합니다..</p>
    </div>
    <div v-else>
      <router-link class="btn btn-primary" tag="button" :to="{name: 'Login'}">로그인</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Vue-cli + JWT',
      need: 'Need login.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
