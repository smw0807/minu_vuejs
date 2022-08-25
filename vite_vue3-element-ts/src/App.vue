<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import HeaderMenu from '@/components/header/HeaderMenu.vue';
import SideMenu from '@/components/side/SideMenu.vue';

// const wHeight: Ref<number> = ref(window.innerHeight);
// console.log(wHeight);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
</style>
