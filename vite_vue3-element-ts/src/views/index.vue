<script setup lang="ts">
import mainSearch from '@/components/mainSearch/search.vue';
import { Store } from '@/store';
const store = Store();
let state = store.root;
let getters = store.getRoot;
console.log('state : ', state);
console.log('getters : ', getters);
state = 'bye';
getters = 'bye2';
console.log('state : ', state);
console.log('getters : ', getters);
const run = async () => {
  try {
    const rs = await store.test(true);
    console.log('rs : ', rs);
  } catch (err) {
    console.error('Error : ', err);
  }
};
run();
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>
        <mainSearch />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.main {
}
</style>