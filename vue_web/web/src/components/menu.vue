<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Vue Web</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li :class="{'active' : 'Board1' == nowPage}">
          <!-- 
            <router-link> 사용시 $attrs is readonly 이런 에러가 뜨는데 정확한 원인을 모르겠음
          --> 
          <!-- <router-link tag="a" :to="{name:'Board1'}">Board 1</router-link> --> 
          <a href="/board1">Baord 1</a>
        </li>
        <li :class="{'active' : 'Board2' == nowPage}">
          <a href="/board2">Board 2</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <!-- <li><a @click="logout">Logout</a></li> -->
        <!-- {{is_login}} -->
        <li v-if="is_login"><a @click="logout">Logout</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>

export default {
    name: 'top-menu',
    data () {
        return {
            is_login: false,
            page: ''
        }
    },
    created() {
      this.page = this.$route.name; //현재 페이지 VueRouter name 저장
      let check = this.$store.getters.getToken;
      if (check.refresh != null) { //refreshToken이 존재하는 경우 아직 로그인한 상태로 판단
        this.is_login = true;
      } else {
        this.is_login = false;
      }
    },
    computed: {
      nowPage() {
        return this.page;
      }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>

<style>

</style>