<script setup lang="ts">
const props = defineProps({
  id: String
})
</script>
<template>
 <p>dynamic routes</p>
 <span>{{ id }}</span>
</template>
<style scoped></style>
<route lang="yaml">
  {
    meta: {
      layout: "second" ## 큰 따옴표 빠지면 적용안됨
    }
  }
</route>