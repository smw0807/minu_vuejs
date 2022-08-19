<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import {
  Check, Delete, Edit, Message, Search, Star,
  Share, Upload, ArrowLeft, ArrowRight, Eleme,
} from '@element-plus/icons-vue'

const types: string[] = ['primary', 'success', 'info', 'warning', 'danger'];
const buttons: object = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
]

const autofocus: Ref<boolean> = ref(true);
const changeFocus = ():void => {
  autofocus.value = !autofocus.value;
  console.log('autofocus : ', autofocus.value);
}
</script>

<template>
  <div>
    <p>Basic Usage</p>
    <el-row :gutter="20">
      <el-col >
        <el-button>Default</el-button>
        <el-button v-for="type in types" :type="type" :key="type">{{type}}</el-button>
      </el-col>
    </el-row>

    <el-row class="mb-4">
      <el-col>
        <el-button plain>Plain</el-button>
        <el-button v-for="type in types" :type="type" :key="type" plain>{{type}}</el-button>
      </el-col>
    </el-row>
    
    <el-row class="flex mb-4">
      <el-col>
        <el-button-group>
          <el-button round>Round</el-button>
          <el-button v-for="type in types" :type="type" :key="type" round>{{type}}</el-button>
        </el-button-group>

        <el-button round>Round</el-button>
        <el-button v-for="type in types" :type="type" :key="type" round>{{type}}</el-button>

      </el-col>
    </el-row>

    <el-row class="mb-4">
      <el-col>
        <span>circle : </span>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle disabled/>
        <el-button type="danger" :icon="Delete" circle :disabled="true"/>
      </el-col>
    </el-row>
    
    <p>Basic text button</p>
    <div class="flex justify-space-between mb-4 flex-wrap gap-4">
      <el-button
        v-for="button in buttons"
        :key="button.text"
        :type="button.type"
        text
        >{{ button.text }}</el-button
      >
    </div>

    <p>Background color always on</p>
    <div class="flex justify-space-between mb-4 flex-wrap gap-4">
      <el-button
        v-for="button in buttons"
        :key="button.text"
        :type="button.type"
        text
        bg
        >{{ button.text }}</el-button
      >
    </div>

    <p>Icon Button</p>
    <div class="flex">
      <el-button type="primary" :icon="Edit" />
      <el-button type="primary" :icon="Share" />
      <el-button type="primary" :icon="Delete" />
      <el-button type="primary" :icon="Search">Search</el-button>
      <el-button type="primary">
        Upload<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>

    <p>Button Group</p>
    <el-button-group>
      <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
      <el-button type="primary">
        Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </el-button-group>

    <el-button-group class="ml-4">
      <el-button type="primary" :icon="Edit" />
      <el-button type="primary" :icon="Share" />
      <el-button type="primary" :icon="Delete" />
    </el-button-group>

    <p>Loading Button</p>
    <el-button type="primary" loading>Loading</el-button>
    <!-- icon 넣으면 icon이 빙빙 돌아감 -->
    <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button>
    <el-button type="primary" :loading-icon="Search" loading>Loading</el-button>
    <el-button type="primary" loading><el-icon class="el-icon--left"><Search /></el-icon>Loading</el-button>
    <el-button type="primary" loading><el-icon class="el-icon--right"><Search /></el-icon>Loading</el-button>
    <el-button type="primary" loading>Loading<el-icon class="el-icon--left"><Search /></el-icon></el-button>
    <el-button type="primary" loading>Loading<el-icon class="el-icon--right"><Search /></el-icon></el-button>
    <el-button type="primary" loading>
      <template #loading>
        <div class="custom-loading">
          <svg class="circular" viewBox="-10, -10, 50, 50">
            <path
              class="path"
              d="
              M 30 15
              L 28 17
              M 25.61 25.61
              A 15 15, 0, 0, 1, 15 30
              A 15 15, 0, 1, 1, 27.99 7.5
              L 15 15
            "
              style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
            />
          </svg>
        </div>
      </template>
      Loading
    </el-button>

    <p>Sizes</p>
    <el-row>
      <el-button size="large">Large</el-button>
      <el-button>Default</el-button>
      <el-button size="small">Small</el-button>
      <el-button size="large" :icon="Search">Search</el-button>
      <el-button :icon="Search">Search</el-button>
      <el-button size="small" :icon="Search">Search</el-button>
    </el-row>
    <el-row class="my-4">
      <el-button size="large" round>Large</el-button>
      <el-button round>Default</el-button>
      <el-button size="small" round>Small</el-button>
      <el-button size="large" :icon="Search" round>Search</el-button>
      <el-button :icon="Search" round>Search</el-button>
      <el-button size="small" :icon="Search" round>Search</el-button>
    </el-row>
    <el-row>
      <el-button :icon="Search" size="large" circle />
      <el-button :icon="Search" circle />
      <el-button :icon="Search" size="small" circle />
      <el-button-group>
        <el-button :icon="Search" size="large" circle />
        <el-button :icon="Search" circle />
        <el-button :icon="Search" size="small" circle />
      </el-button-group>
    </el-row>

    <p>Button Attributes Test</p>
    <el-row>
      <span>autofocus</span> 
      <!-- 최초 true일 때만 포커스 이벤트가 발동하고 값을 변경해서 false 에서 true로 바꾸는건 포커스 이벤트가 안됨 -->
      <el-button :autofocus="autofocus" type="info">Autofocus</el-button> 
      <el-button type="primary" @click="changeFocus">Change Autofocus</el-button>
    </el-row>
  </div>
</template>

<style scoped>
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>