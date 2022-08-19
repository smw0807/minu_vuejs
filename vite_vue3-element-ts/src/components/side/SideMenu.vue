<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const path = computed(() => route.path);

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
        <template v-for="(menu, idx) in menus" :index="menu.path">
          <el-menu-item v-if="!menu.children" :index="menu.path" :key="idx">
            <span>{{menu.name}}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="menu.path">
            <template #title>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item-group v-for="(subMenu, sIdx) in menu.children" :key="sIdx">
              <el-menu-item :index="subMenu.path">{{subMenu.name}}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
        <!-- <el-menu-item v-for="(menu, idx) in menus" :index="menu.path" :key="idx">
          <span>{{menu.name}}</span>
        </el-menu-item> -->
      </el-menu>
    </el-col>
  </el-row>
</template>
<style>

</style>