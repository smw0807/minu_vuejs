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
        <li><a href="/board1">Baord 1</a></li>
        <li><a href="/board2">Board 2</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a @click="logout">Logout</a></li>
        <!-- <li v-if="is_login"><a @click="logout">Logout</a></li> -->
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
            msg: '',
        }
    },
    // beforeCreate() {
    //   var token = this.$store.getters.getToken;
    //   if (token.access == null && token.refresh == null) {
    //       this.$router.push({name: 'Login'});
    //   }
    //   if (token.access == null && token.refresh != null) { //accessToken 재요청
    //       this.$store.dispatch('refreshToken');
    //   }
    // },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    },
    props: ["is_login"]
}
</script>

<style>

</style>