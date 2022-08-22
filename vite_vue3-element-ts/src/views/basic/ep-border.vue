<script setup lang="ts">
import { ref } from 'vue'
/**
 * Vuetify 처럼 그냥 컴포넌트 props 옵션으로 radius 같은 옵션 주는게 없고
 * class를 써야하는건가??
 */
const radiusGroup = ref([
  {
    name: 'No Radius',
    type: '',
  },
  {
    name: 'Small Radius',
    type: 'small',
  },
  {
    name: 'Large Radius',
    type: 'base',
  },
  {
    name: 'Round Radius',
    type: 'round',
  },
])
const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--el-${prefix}-${type}`
    )
  return getCssVarValue('border-radius', type)
}
</script>

<template>
  <div>
    <table class="demo-border">
      <tbody>
        <tr>
          <td class="text">Name</td>
          <td class="text">Thickness</td>
          <td class="line">Demo</td>
        </tr>
        <tr>
          <td class="text">Solid</td>
          <td class="text">1px</td>
          <td class="line">
            <div />
          </td>
        </tr>
        <tr>
          <td class="text">Dashed</td>
          <td class="text">2px</td>
          <td class="line">
            <div class="dashed" />
          </td>
        </tr>
      </tbody>
    </table>
   
    <el-row :gutter="12" class="demo-radius">
      <el-col
        v-for="(radius, i) in radiusGroup"
        :key="i"
        :span="6"
        :xs="{ span: 12 }"
      >
        <div class="title">{{ radius.name }}</div>
        <div class="value">
          <code>border-radius: {{ getValue(radius.type) || '0px' }}</code>
        </div>
        <div
          class="radius"
          :style="{
            borderRadius: radius.type
              ? `var(--el-border-radius-${radius.type})`
              : '',
          }"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.demo-border .text {
  width: 15%;
}
.demo-border .line {
  width: 70%;
}
.demo-border .line div {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--el-border-color);
}
.demo-border .line .dashed {
  border-top: 2px dashed var(--el-border-color);
}
.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>