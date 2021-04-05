<template>
  <v-app dark>
    <side-menu/>
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
  import sideMenu from '~/components/sideMenu'
  export default {
    data () {
      return {
        title: 'Vuetify Web',
        clipped: true
      }
    },
    components: {
      sideMenu
    }
  }
</script>
