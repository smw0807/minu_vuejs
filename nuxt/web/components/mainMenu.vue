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
        <!-- 조직도 리스트 부분 시작 -->
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-sitemap</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>조직도</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <org-chart/>
          </v-list-item-content>
        </v-list-item>
        <!-- 조직도 리스트 부분 끝 -->

        <v-divider dark></v-divider> <!-- 구분선 -->
        
        <template v-for="menu in menus">
          <!-- 트리 메뉴 시작 -->
          <v-list-group
            v-if="menu.children"
            :key="menu.title"
            :prepend-icon="menu.icon"
            append-icon=""
            no-action
            >
            <template v-slot:activator>
              <v-list-item-title>
                {{ menu.title }}
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="(child, i) in menu.children" :key="i"
              :to="child.to"
              >
              <v-list-item-icon v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
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
            >
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

      <v-divider dark></v-divider><!-- 구분선 -->

      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>설정</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider dark></v-divider><!-- 구분선 -->
      
      <v-list>
        <template v-for="menu in tmp_menu">
          <!-- 트리 메뉴 시작 -->
          <v-list-group
            v-if="menu.children"
            :key="menu.title"
            :prepend-icon="menu.icon"
            append-icon=""
            no-action
            >
            <template v-slot:activator>
              <v-list-item-title>
                {{ menu.title }}
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="(child, i) in menu.children" :key="i"
              :to="child.to"
              >
              <v-list-item-icon v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
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
            >
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
import orgChart from '~/components/orgChart'
export default {
  data () {
    return {
      title: 'Application', //상단 app-bar 이름
      org: false, 
      drawer: true,
      clipped: true,
      menus: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        {
          title: '장비설정', icon: 'mdi-cog',
          model: false,
          to: '/setting/app'
          // children: [
          //   { title: '응용관리', to: '/'},
          //   { title: '사용자관리', to: '/setting/user'}
          // ]
        }
      ],
      tmp_menu: [
        { title: 'Board', icon: 'mdi-file-table-box', to: '/board/board' },
        { title: 'vuetify', icon: 'mdi-vuetify',
          model: false,
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
      ]
    }
  },
  components:{
    orgChart
  },
  computed: {
  }
}
</script>

<style>

</style>