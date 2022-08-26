<script setup lang="ts">
</script>

<template>
  <div>
    <p>Basic layout</p>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple"></div>
      </el-col>
    </el-row>
    <p>Basic layout</p>
    <span>use gutter</span>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple-dark {
  background-color: #73767a;
}
.ep-bg-purple {
  background-color: #b1b3b8;
}
.ep-bg-purple-light {
  background-color: #c8c9cc;
}
</style>