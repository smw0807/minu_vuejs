<template>
  <div>root views test</div>
</template>

<script>
export default {
 created() {
   console.log(this.$store.getters['rootState']);
   console.log(this.$store.getters['tmp/framework']);
 }
}
</script>

<script setup>
import { useStore } from 'vuex'
const store = useStore();
const rootTest = store.getters['rootState'];
console.log(rootTest);
const framework = store.getters['tmp/framework'];
console.log(framework);
</script>

<style>

</style>