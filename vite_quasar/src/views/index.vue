<template>
  <div>
    root views test......
    <router-link to="/composition?name=dog"> query 방식 </router-link>
    <!-- <router-link :to="{ name: 'composition', params: { name: 'dog', age: 4 } }">
      params 선언적 방식
    </router-link> -->
  </div>
</template>

<script>
export default {
  created() {
    // console.log('old : ', this.$store.getters['rootState']);
    // console.log('old : ', this.$store.getters['tmp/framework']);
    // console.log('old : ', import.meta.env);
  },
};
</script>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
const rootTest = store.getters['rootState'];
const framework = store.getters['tmp/framework'];
// console.log('setup : ', rootTest);
// console.log('setup : ', framework);
// console.log('setup : ', import.meta.env);
</script>

<style>
</style>