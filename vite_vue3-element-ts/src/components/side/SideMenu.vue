<script setup lang="ts">
import { ref,  onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

//======== menu =====================
import menusArr from '@/routes/routes.config';
const menus: Array<object> = menusArr.filter(() => true);
const menuSelect = (v: string): void => {
  defaultAction.value = v;
}

let test = computed(() => route.path);
console.log(test);
let defaultAction: Ref<string> = ref(route.path);
onMounted(() => {
  console.log('route.path : ', route.path);
  defaultAction.value = route.path;
  console.log(defaultAction);
});
</script>
<template>
  <el-row>
    <el-col>
      <el-menu
          :default-active="defaultAction"
          class="el-menu-vertical-demo"
          :router="true"
          @select="menuSelect"
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