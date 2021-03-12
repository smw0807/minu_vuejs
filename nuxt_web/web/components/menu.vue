<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- <a class="navbar-brand" href="/">NuxtJS Web</a> -->
      <nuxt-link class="navbar-brand" to="/">NuxtJS Web</nuxt-link>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li :class="{'active' : 'board1' == currentPage}">
          <nuxt-link to="/board1">Board1</nuxt-link>
        </li>
        <li :class="{'active' : 'board2' == currentPage}">
            <nuxt-link to="/board2">Board2</nuxt-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>

export default {
    name: 'top-menu',
    computed: {
      currentPage() { //현재 보고 있는 라우터 이름을 체크
        return this.$nuxt.$route.name; //바뀔때마다 currentPage의 데이터가 바뀌면서 해당하는 메뉴 active 시켜줌
      }
    },
    methods: {
        logout() { //로그아웃 버튼 클릭
            this.$store.dispatch('logout'); //저장소에 있는 로그아웃 actions를 트리거
            this.$router.push('/login'); //로그인 페이지로 이동
        }
    }
}
</script>

<style>

</style>