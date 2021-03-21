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
          <li v-for="menu in menus" :key="menu.no" :class="{'active' : menu.path == nowPage}">
            <nuxt-link :to="{path: menu.path}">{{ menu.name }}</nuxt-link>
          </li>
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
        {no: 0, path: '/main', name: 'Home'},
        {no: 1, path: '/board/board', name: '게시판1'},
        {no: 2, path: '/vuetify/vuetify1', name: 'Vuetify'}
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