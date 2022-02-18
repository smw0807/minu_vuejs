<template>
  <div>root views test</div>
</template>

<script>
export default {
  created() {
    console.log('old : ', this.$store.getters['rootState']);
    console.log('old : ', this.$store.getters['tmp/framework']);
    console.log('old : ', import.meta.env);
 }
}
</script>

<script setup>
  import { useStore } from 'vuex'
  const store = useStore();
  const rootTest = store.getters['rootState'];
  console.log('setup : ', rootTest);
  const framework = store.getters['tmp/framework'];
  console.log('setup : ', framework);
  console.log('setup : ', import.meta.env);
</script>

<style>

</style>