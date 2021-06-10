<template>
  <div>
    <v-app-bar
        app
        dark
      >
      <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
      <v-divider vertical class="ml-1"></v-divider>
      <v-breadcrumbs
        :items="breadcrumbs"
        large
        >
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="searchingMenu =!searchingMenu">
        <v-icon>mdi-magnify</v-icon>
      </v-app-bar-nav-icon>
      <v-col cols="3" v-if="searchingMenu" transition="fab-transition">
        <v-autocomplete
          no-data-text="존재하지 않는 메뉴입니다."
          label="메뉴 검색"
          class="mt-6"
          :items="searchMenu"
          item-text="title"
          clearable
          v-model="searchSelect"
          @change="selectMenu"
          ></v-autocomplete>
      </v-col>
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
          <!-- 구분선 긋기 -->
          <v-list-item
            v-if="item.divider"
            :key="item.title"
            >
            <v-divider dark></v-divider>
          </v-list-item>

          <v-list-group
            v-else-if="item.items"
            :key="item.title"
            :prepend-icon="item.icon"
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
            >
            <v-list-item-icon>
                <v-icon v-if="item.icon">{{item.icon}}</v-icon>
              </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
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
      miniVariant: true,
      searchSelect: null,
      searchingMenu: false,
      searchMenu: [],
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
        { divider: true },
        {
          title: 'menu1',
          icon: 'mdi-view-dashboard',
          to:'/dashboard'
        },
        {
          title: 'menu2',
          icon: 'mdi-alert-outline',
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
          title: 'menu3',
          icon: 'mdi-traffic-light',
          items: [
            { title: 'sub1', to: '/traffic/allTraffic', icon: 'mdi-traffic-light' },
            { title: 'sub2', to: '/traffic/all', icon: 'mdi-account-multiple' },
            { title: 'sub3', to: '/traffic/all', icon:'mdi-magnify' },
            { title: 'sub4', to: '/traffic/serverPkt', icon:'mdi-text-box-search' }
          ],
        },
      ],
      breadcrumbs:[]
    }
  },
  components:{
  },
  computed: {
  },
  watch: {
    $route(route) {
      this.setBreadcrumbs(route);
    }
  },
  created() {
    if (this.breadcrumbs.length === 0) {
      this.setBreadcrumbs(this.$nuxt.$route);
    }
    if (this.searchMenu.length === 0) {
      this.setSearchMenu();
    }
  },
  methods: {
    setBreadcrumbs(route) {
      this.breadcrumbs = [];
      const path = route.path;
      const items = this.items;
      for (var i in items) {
        if (items[i].items) {
          const sub = items[i].items;
          for (var j in sub) {
            if (path === sub[j].to) {
              this.breadcrumbs.push({ text: items[i].title, disabled: false })
              this.breadcrumbs.push({ text: sub[j].title, disabled: false })
            }
          }
        } else {
          if (path === items[i].to) {
            this.breadcrumbs.push({ text: items[i].title, disabled: false })
          }
        }
      }
    },
    setSearchMenu() {
      const items = this.items;
      for (var i in items) {
        if (items[i].items) {
          const sub = items[i].items;
          for (var j in sub) {
            this.searchMenu.push({ title: items[i].title + ' > ' + sub[j].title, value: sub[j].to })
          }
        } else {
          this.searchMenu.push({ title: items[i].title, value: items[i].to })
        }
      }
    },
    selectMenu() {
      if (this.searchSelect) {
        this.$router.push(this.searchSelect);
        this.searchingMenu = false;
        this.searchSelect = null;
      }
    }
  }
}
</script>

<style>
#main_nav {
  top: 0 !important;
  max-height:100% !important;
  z-index: 10000 !important;
}
</style>