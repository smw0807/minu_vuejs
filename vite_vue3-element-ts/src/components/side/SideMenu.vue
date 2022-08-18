<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const path = computed(() => route.path);
//======== menu =====================
import menusArr from '@/routes/routes.config';
const menus: Array<object> = menusArr.filter(() => true);
</script>
<template>
  <el-row>
    <el-col>
      <el-menu
          :default-active="path"
          class="el-menu-vertical-demo"
          :router="true"
          >
          <el-menu-item v-for="(menu, idx) in menus" :index="menu.path" :key="idx">
            <span>{{menu.name}}</span>
          </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
</template>
<style>

</style>