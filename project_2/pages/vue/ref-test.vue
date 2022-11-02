<template>
  <v-container lg12>
    <v-layout column>
      <ref-test />
      <arrow />
    </v-layout>
  </v-container>
</template>

<script>
import refTest from '@/components/vue/ref-test/parent-com';
import arrow from '@/components/vue/arrow-test/arrow';
export default {
  components: {
    refTest,
    arrow,
  },
};
</script>

<style>
</style>