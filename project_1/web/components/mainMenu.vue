<template>
  <div>
    <!-- <v-app-bar
        app
        dark
      >
      <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
      <v-divider vertical class="ml-1"></v-divider>
      <v-breadcrumbs
        :items="test"
        large
      ></v-breadcrumbs>
    </v-app-bar>

    <v-navigation-drawer
      id="main_nav"
      app
      v-model="drawer"
      :clipped="clipped"
      :expand-on-hover="drawer"
      permanent
      dark
      >
      <v-list dense nav>

        <v-list-item :class="miniVariant && 'px-0 ma-0'">
          <v-list-item-avatar>
            <img src="/v.png"  style="width: 30px; height: 30px; margin: 0;">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >AF Manager</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider dark></v-divider> 
        
        <template v-for="item in items">
          <v-list-group
            v-if="item.items"
            :key="item.title"
            :prepend-icon="item.action"
            class="mb-5"
            >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
              class="ml-3"
              >
              <v-list-item-icon>
                <v-icon small v-if="subItem.icon">{{subItem.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item 
            v-else
            :to="item.to"
            :key="item.title"
            class="mb-5"
            >
            <v-list-item-icon>
                <v-icon v-if="item.action">{{item.action}}</v-icon>
              </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
     -->
    <v-navigation-drawer 
      v-model="drawer"
      app
      :clipped="clipped"
      :expand-on-hover="drawer"
      permanent
      >
      <v-list dense>
        <template v-for="item in items">
          <!-- 구분선 긋기 -->
          <v-list-item
            v-if="item.divider"
            :key="item.title"
            >
            <v-divider dark></v-divider>
          </v-list-item>

          <!-- 메뉴 넣기 -->
          <v-list-item 
            :to="item.to"
            :key="item.title"
            v-else
            >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
export default {
  data () {
    return {
      title: 'NuxtJS', //상단 app-bar 이름
      org: false, 
      drawer: true,
      clipped: true,
      items: [
        { title: 'index', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'test', icon: 'mdi-api', to: '/api/apiTest' },
        { divider: true },
        { title: 'DataTables', icon: 'mdi-table-multiple', to: '/vtable/datatables'},
        { title: 'DT checkbox', icon: 'mdi-check-bold', to: '/vtable/datatable2'},
        { title: 'Dataiterator', icon: 'mdi-table-multiple', to: '/vtable/dataiterator'},
        { divider: true },
        { title: 'v-card grid', icon: 'mdi-view-grid', to: '/grid/vcard'},
        { title: 'v-layout grid', icon: 'mdi-view-grid-outline', to: '/grid/vlayout'},
        { divider: true },
        { title: 'v-picker', icon: 'mdi-calendar', to: '/vpicker/datepicker'},
        { divider: true },
        { title: 'vue slimgrid', icon: 'mdi-grid', to: '/slimgrid/grid1'},
      ],
      temp: [
        {
          action: 'mdi-view-dashboard',
          title: 'menu1',
          to:'/dashboard'
        },
        {
          action: 'mdi-alert-outline',
          title: 'menu2',
          active: true,
          items: [
            { title: 'sub1', to: '/threat/monitoring', icon: 'mdi-monitor-dashboard' },
            { title: 'sub2', to: '/threat/analysis', icon: 'mdi-playlist-check' },
            { title: 'sub3', to: '/threat/threat', icon:'mdi-sync-alert' },
            { title: 'sub4', to: '/threat/threat', icon:'mdi-radar' },
            { title: 'sub5', to: '/threat/threat', icon:'mdi-magnify' }
          ],
        },
        {
          action: 'mdi-traffic-light',
          title: 'menu3',
          items: [
            { title: 'sub1', to: '/traffic/allTraffic', icon: 'mdi-traffic-light' },
            { title: 'sub2', to: '/traffic/all', icon: 'mdi-account-multiple' },
            { title: 'sub3', to: '/traffic/all', icon:'mdi-magnify' },
            { title: 'sub4', to: '/traffic/serverPkt', icon:'mdi-text-box-search' }
          ],
        },
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