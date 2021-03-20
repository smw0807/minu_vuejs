<template>
<!-- 메뉴 영역 -->
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <nuxt-link class="navbar-brand" :to="{path:'/'}">NuxtJS Web</nuxt-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li :class="{'active' : '/main' == nowPage}"><nuxt-link :to="{path:'/main'}">Home</nuxt-link></li>
          <li :class="{'active' : '/board/board' == nowPage}"><nuxt-link :to="{path:'/board/board'}">게시판1</nuxt-link></li>
          <li :class="{'active' : '/vuetify/test1' == nowPage}"><nuxt-link :to="{path:'/vuetify/test1'}">Vuetify</nuxt-link></li>
        </ul>
      </div>
    </div>
  </nav>
<!-- 메뉴 영역 끝 -->  
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menus: [
        {path: '/main', name: 'Home'},
        {path: '/board/board', name: '게시판1'},
        {path: '/vuetify/test1', name: 'Vuetify'}
      ]
    }
  },
  created() {

  },
  computed: {
    nowPage() {
      return this.$nuxt.$route.path;
    }
  }
}
</script>

<style>

</style>