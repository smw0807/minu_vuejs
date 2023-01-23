<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { User } from 'firebase/auth';
import { GoogleAuthAPI } from '@/apis'
const googleAuth = new GoogleAuthAPI();

const signIn = async (): Promise<void> => {
 try {
  const user: User = await googleAuth.signIn();
  console.log(user);
 } catch (err) {
  console.error(err);
 }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="signIn">로그인</button>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
