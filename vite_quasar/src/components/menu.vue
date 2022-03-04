<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
    <q-btn to="/" class="full-width" label="index"/>
    <q-btn to="/composition" class="full-width" label="composition API"/>
    <q-btn to="/test-api" class="full-width" label="BackEnd API Test"/>
  </q-drawer>
</template>

<script>
import { onMounted } from 'vue';
export default {
  props:{
    leftDrawerOpen: Boolean
  },
  setup(props) {
    // onMounted(() => {
    //   console.log('menu : ', props.leftDrawerOpen);
    // })
  }
}
</script>

<style>

</style>