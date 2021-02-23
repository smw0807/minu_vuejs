<template>
  <div id="app">
    <!-- <top-menu :is_login="false" :session_info="'check'"></top-menu> -->
    <!-- <top-menu :is_login="is_login"></top-menu> -->
    <top-menu></top-menu>
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
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
  beforeCreate() {
    var token = this.$store.getters.getToken;
    if (token.access == null && token.refresh == null) {
      this.$router.push({name: 'Login'});
    }
    if (token.access == null && token.refresh != null) {
      //accessToken 재요청
      this.$store.commit('refreshToken', token.refresh);
    }
    if (token.access != null && token.refresh != null) {
    }
  },
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
