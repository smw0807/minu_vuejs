<template>
  <v-layout column>
    <v-row>
      <v-col>
        <hello />
        <router-link :to="{ name: 'test1', params: { name: 'dog', age: 4 } }">
          params 선언적 방식
        </router-link>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
/**
 * Do not use built-in or reserved HTML elements as component id: main
 * 이 에러 뜨는 원인 찾기
 */
import hello from '@/components/HelloWorld';
export default {
  components: {
    hello,
  },
};
</script>

<style>
</style>