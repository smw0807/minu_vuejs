<template>
  <div>
    <v-navigation-drawer 
      v-model="drawer"
      app
      :clipped="clipped"
      expand-on-hover
      permanent
      >
      <v-list dense>
        <v-list-item v-for="item in items"
          :to="item.to"
          :key="item.title"
          link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        clipped-left
      >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      clipped: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Photos', icon: 'mdi-image', to: '/board/board' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      menus: [
        {
          name: 'Home',
          path: '/main',
          child: false
        },
        {
          name: '게시판',
          path: '/board/',
          child: true,
          sub: [
            { name: '게시판1', path: '/board/board' }
          ]
        },
        {
          name: 'Vuetify',
          path: '/vuetify/vuetify1',
          child: true,
          sub: [
            { name: 'vuetify1', path: '/vuetify/vuetify1' },
            { name: 'vuetify2', path: '/vuetify/vuetify2' }
          ]
        },
        {
          name: 'API Test',
          path: '/api/test',
          child: true,
          sub: [
            { name: 'API 1', path: '/api/test'},
            { name: 'API 2', path: '/api/proxytest'}
          ]
        }
      ]
    }
  },
}
</script>

<style>

</style>