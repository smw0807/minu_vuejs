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
      currentPage() {
        return this.$nuxt.$route.name;
      }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>