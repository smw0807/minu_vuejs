<template>
  <div>
    <v-navigation-drawer 
      v-model="drawer"
      app
      :clipped="clipped"
      :expand-on-hover="drawer"
      permanent
      >
      <v-list dense>
        <template v-for="menu in menus">
          <!-- 단일 메뉴 시작 -->
          <v-list-item 
            :to="menu.to"
            :key="menu.title"
            >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <!-- 구분선 -->
      <!-- <v-divider dark></v-divider> -->
    </v-navigation-drawer>

    <v-app-bar
        app
        clipped-left
      >
      <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
/**
 * icon link
 * fontawesome 
 * https://fontawesome.com/icons?d=listing&p=2&q=request&m=free
 * material 
 * https://materialdesignicons.com/
 * 
 */
export default {
  data () {
    return {
      title: 'NuxtJS', //상단 app-bar 이름
      org: false, 
      drawer: true,
      clipped: true,
      menus: [
        { title: 'index', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'test', icon: 'mdi-api', model: false, to: '/api/apiTest' }
      ]
    }
  },
  components:{
  },
  computed: {
  }
}
</script>

<style>

</style>