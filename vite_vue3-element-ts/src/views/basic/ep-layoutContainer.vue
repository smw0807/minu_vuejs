<script setup lang="ts">
const headerStyles: object = {
  'background-color': '#79bbff',
};
const asideStyles: object = {
  'background-color': '#d1edc4',
  width: '200px',
};
const mainStyles: object = {
  'background-color': '#d9ecff',
};
const footerStyles: object = {
  'background-color': '#b3e19d',
};
</script>

<template>
  <div>
    <p>Common layouts</p>
    <div class="common-layout">
      <el-container>
        <el-header :style="headerStyles">Header</el-header>
        <el-main :style="mainStyles">Main</el-main>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-header :style="headerStyles">Header</el-header>
        <el-main :style="mainStyles">Main</el-main>
        <el-footer :style="footerStyles">Footer</el-footer>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-aside :style="asideStyles">Aside</el-aside>
        <el-main :style="mainStyles">Main</el-main>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-header :style="headerStyles">Header</el-header>
        <el-container>
          <el-aside :style="asideStyles">Aside</el-aside>
          <el-main :style="mainStyles">Main</el-main>
        </el-container>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-header :style="headerStyles">Header</el-header>
        <el-container>
          <el-aside :style="asideStyles">Aside</el-aside>
          <el-container>
            <el-main :style="mainStyles">Main</el-main>
            <el-footer :style="footerStyles">Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-aside :style="asideStyles">Aside</el-aside>
        <el-container>
          <el-header :style="headerStyles">Header</el-header>
          <el-main :style="mainStyles">Main</el-main>
        </el-container>
      </el-container>
    </div>

    <br />

    <div class="common-layout">
      <el-container>
        <el-aside :style="asideStyles">Aside</el-aside>
        <el-container>
          <el-header :style="headerStyles">Header</el-header>
          <el-main :style="mainStyles">Main</el-main>
          <el-footer :style="footerStyles">Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
</style>