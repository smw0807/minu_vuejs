<script setup lang="ts">
import {useImage } from '@vueuse/core';

const avatarUrl = 'http://place.dog/300/200';
const { isLoading } = useImage({src: avatarUrl})
//컴포져블 테스트
const foo = useFoo();
console.log(foo);
</script>
<template>
  <test/>
  <BaseInput/>
  <span v-if="isLoading">Loading</span>
  <img v-else :src="avatarUrl">
  <NuxtWelcome />
</template>
