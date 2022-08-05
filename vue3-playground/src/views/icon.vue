<script setup lang="ts">
</script>

<template>
  <div>
    <div class="icons-preview-code">
      <div v-for="i in [18, 24, 36, 48]" :key="i" class="icons-preview">
        <ui-icon :size="i">face</ui-icon>
        <div class="icon-caption">{{ i }}px</div>
      </div>
    </div>
    <div class="icons-preview-code">
      <div class="icons-preview">
        <ui-icon dark>face</ui-icon>
        <div class="icon-caption">Normal</div>
      </div>
      <div class="icons-preview">
        <ui-icon dark inactive>face</ui-icon>
        <div class="icon-caption">Disabled</div>
      </div>
      <div class="icons-preview icons-dark-bg">
        <ui-icon light>face</ui-icon>
        <div class="icon-caption">Normal</div>
      </div>
      <div class="icons-preview icons-dark-bg">
        <ui-icon light inactive>face</ui-icon>
        <div class="icon-caption">Disabled</div>
      </div>
      <div class="icons-preview">
        <ui-icon class="orange600">face</ui-icon>
        <div class="icon-caption">orange600</div>
      </div>
    </div>
    <ui-badge overlap dot>
      <ui-icon>mail</ui-icon>
    </ui-badge>

    <ui-badge overlap :count="8">
      <ui-icon>mail</ui-icon>
    </ui-badge>

    <ui-badge overlap :count="999">
      <ui-icon>mail</ui-icon>
    </ui-badge>
  </div>
  
</template>


<style>

</style>