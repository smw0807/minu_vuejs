<script setup lang="ts">
import mainSearch from '../components/mainSerch/index.vue';
</script>

<template>
  <div>
    <ui-grid class="demo-grid max-width" position="center">
      <ui-grid-cell class="demo-cell" columns="12">
        <mainSearch/>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>

<style scoped>
.demo-grid.max-width {
  max-width: 900px;
}
</style>