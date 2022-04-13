<template>
  <q-layout view="hHh lpR lFf">

    <q-header bordered class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <login/>

    <side-menu :drawer="drawer"/>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import sideMenu from './components/menu.vue'
import login from './components/login/login.vue'

export default {
  setup () {
    let drawer = ref(false);

    return {
      drawer,
    }
  },
  components: {
    sideMenu,
    login
  }
}
</script>