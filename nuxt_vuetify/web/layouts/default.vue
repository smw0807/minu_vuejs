<template>
  <v-app dark>
    <side-menu></side-menu>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import sideMenu from '~/components/sideMenu';
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
          { icon: '', title: 'Test1', to: '/test1' }
        ],
        miniVariant: false,
        right: true,
        title: 'Vuetify Web'
      }
    },
    components: {
      sideMenu
    },
  }
</script>
