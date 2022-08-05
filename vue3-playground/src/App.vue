<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div class="demo-container">
    <!-- App bar -->
    <ui-top-app-bar
      class="demo-app-bar"
      content-selector=".demo-content"
      :nav-icon="false"
    >
      Title
    </ui-top-app-bar>
    <!-- Content -->
    <div class="demo-content">
      <!-- Drawer -->
      <ui-drawer viewport-height>
        <ui-drawer-header>
          <ui-drawer-title>Title</ui-drawer-title>
          <ui-drawer-subtitle>Subtitle</ui-drawer-subtitle>
        </ui-drawer-header>
        <ui-drawer-content>
          <ui-nav>
            <ui-nav-item href="javascript:void(0)" active>
              Item {{ 0 }}
            </ui-nav-item>
            <ui-nav-item v-for="i in 12" :key="i" href="javascript:void(0)">
              Item {{ i }}
            </ui-nav-item>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>
      <!-- App content -->
      <div class="demo-app-content">
        <router-view/>
      </div>
    </div>
  </div>

  
</template>

<style>
body {
  margin: 0;
}
.demo-app-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
