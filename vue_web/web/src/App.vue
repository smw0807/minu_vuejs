<template>
  <div id="app">
    <top-menu></top-menu>
    <transition name="component-fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>
import menu from '@/components/menu';
export default {
  name: 'App',
  created() {
    //메인 컴포넌트를 렌더링하면서 토큰체크
    let token = this.$store.getters.getToken;
    if (token.access == null && token.refresh == null) { //다 없으면 로그인 페이지로
      //이미 로그인 페이지가 떠있는 상태에서 새로 고침하면 중복 에러 떠서 이렇게 처리함
      this.$router.push({name: 'Login'}).catch(() => {}); 
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
