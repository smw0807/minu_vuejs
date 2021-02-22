<template>
  <div id="app">
    <!-- <top-menu :is_login="false" :session_info="'check'"></top-menu> -->
    <!-- <top-menu :is_login="is_login"></top-menu> -->
    <top-menu></top-menu>
    <router-view/>
  </div>
</template>

<script>
//로그인 여부 파악해서 세션정보 topMenu 컴포넌트로 넘기기
import menu from '@/components/menu'
export default {
  name: 'App',
  data () {
    return {
      is_login: false
    }
  },
  // beforeCreate() {
  //       console.log('checkToken!!');
  //       this.$store.commit('checkToken');
  //       if (this.$store.state.accessToken != '') {
  //           this.is_login = true;
  //       }
  //   },
  components: {
    'topMenu': menu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
