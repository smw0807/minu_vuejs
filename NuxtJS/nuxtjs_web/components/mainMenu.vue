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
        <template v-for="menu in menus">
          <!-- 트리 메뉴 시작 -->
          <v-list-group
            v-if="menu.children"
            :key="menu.title"
            v-model="menu.model"
            :prepend-icon="menu.icon"
            append-icon=""
            >
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
              link
              >
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
            link>
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
      menus: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
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
        }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ]
    }
  },
}
</script>

<style>

</style>