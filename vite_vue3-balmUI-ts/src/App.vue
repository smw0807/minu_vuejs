<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import menusArr from './routes/routes.config';
const menus : Array<Object> = menusArr.filter(()=> true);

</script>

<template>
  <div class="demo-container">
    <!-- App bar -->
    <ui-top-app-bar
      class="demo-app-bar"
      content-selector=".demo-content"
      :nav-icon="false"
    >
      Vite/Vue3/BalmUI/TypeScript
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
            <div v-for="menu in menus" :key="menu.path">
              <router-link class="view main-content" v-slot="{isActive}" :to="menu.path">
                <ui-nav-item 
                  :active="isActive"
                  href="javascript:void(0)"
                >
                  {{menu.name}}
                </ui-nav-item>
              </router-link>
            </div>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>

      <!-- App content -->
      <div class="demo-app-content">
        <!-- <router-view/> -->
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component"/>
          </transition>
        </router-view>
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
a {
  text-decoration: none;
}
</style>
