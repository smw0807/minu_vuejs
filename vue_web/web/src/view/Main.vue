<template>
  <div>
    <h3>{{msg}}</h3>
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
  },
  created() {
     this.$store.dispatch('initBoardList');
  }
}
</script>

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
