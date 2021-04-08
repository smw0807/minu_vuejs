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
        <v-list-item @click.stop="org = !org">
          <v-list-item-action>
            <v-icon>mdi-sitemap</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>조직도</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider dark></v-divider>
        
        <template v-for="menu in menus">
          <!-- 트리 메뉴 시작 -->
          <v-list-group
            v-if="menu.children"
            :key="menu.title"
            v-model="menu.model"
            :prepend-icon="menu.icon"
            append-icon="">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                {{ menu.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in menu.children"
              :key="i"
              :to="child.to"
              nuxt>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- 트리 메뉴 끝 -->
          
          <!-- 단일 메뉴 시작 -->
          <v-list-item 
            v-else
            :to="menu.to"
            :key="menu.title"
            nuxt>
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- 단일 메뉴 끝 -->
        </template>
      </v-list>

      <v-divider dark></v-divider>

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

    <!-- 조직도 -->
    <v-navigation-drawer
        v-model="org"
        fixed
        temporary
      >
    </v-navigation-drawer>
    
    <v-app-bar
        app
        clipped-left
        outlined
      >
      <!-- <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import orgChart from './orgChart'
export default {
  data () {
    return {
      title: 'Application', //상단 app-bar 이름
      org: false,  //조직도 옵션 false: 닫혀있는 상태, true: 열림
      drawer: true,
      clipped: true,
      menus: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Board', icon: 'mdi-file-table-box', to: '/board/board' },
        { title: 'vuetify', icon: 'mdi-vuetify',
          model: true, //false 일땐 하위 메뉴 닫혀있음, true는 열려있음
          children: [
            { title: 'vuetify1', to: '/vuetify/vuetify1'},
            { title: 'vuetify2', to: '/vuetify/vuetify2'}
          ]
        },
        {
          title: 'API', 'icon': 'mdi-api',
          model: false,
          children: [
            { title: 'API 1', to: '/api/test'},
            { title: 'API 2', to: '/api/proxytest'}
          ]
        },
        {
          title: '장비설정', icon: 'mdi-cog',
          model: false,
          children: [
            { title: '응용관리', to: '/'},
            { title: '사용자관리', icon:'fas fa-user', to: '/setting/user'}
          ]
        }
      ]
    }
  },
  components:{
    orgChart
  },
  computed: {
    openOrg() {
      return this.org;
    }
  }
}
</script>

<style>

</style>