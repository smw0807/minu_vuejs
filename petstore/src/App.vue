<template>
  <div id="app">
    <transition name="fade" mode="out-in"> <!-- out-in 모드의 트랜지션 컴포넌트 -->
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .fade-enter-active, .fade-leave-active { /* 트랜지션을 설정하는 Vue.js 트랜지션 클래스 */
    transition: opacity .5s ease-in;
  }
  .fade-enter, .fade-leave-to { /* 투명도를 설정하는 Vue.js 트랜지션 클래스 */
    opacity: 0;
  }
</style>

