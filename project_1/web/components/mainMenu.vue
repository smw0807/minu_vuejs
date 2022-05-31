<template>
  <div>
    <v-app-bar dark app >
      <!-- <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
      <v-divider vertical class="ml-1"></v-divider> -->

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
          return-object
          ></v-autocomplete>
      </v-col>

      <change-theme></change-theme>
      
    </v-app-bar>

    <v-navigation-drawer
      id="main_nav"
      app
      v-model="drawer"
      :clipped="clipped"
      permanent
      dark
      >
      <v-list dense nav>

        <v-list-item :class="miniVariant && 'px-0 ma-0'">
          <v-list-item-avatar>
            <img src="/v.png"  style="width: 30px; height: 30px; margin: 0;">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >연습용 Nuxt</v-list-item-title>
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
import changeTheme from '~/components/changeTheme'
import { default as menu } from '~/menu'
export default {
  head() {
    return {
      title: this.title
    }
  },
  data () {
    return {
      title: '', //상단 app-bar 이름
      default_title: 'NuxtJS',
      drawer: true,
      clipped: true,
      miniVariant: true,
      searchSelect: null,
      searchingMenu: false,
      searchMenu: [],
      items: null,
      breadcrumbs:[]
    }
  },
  components:{
    changeTheme,
  },
  computed: {
  },
  watch: {
    $route(route) {
      this.setBreadcrumbs(route);
    }
  },
  created() {
    const mode = this.$config.mode;
    if (mode === 'dev') {
      this.items = menu.items;
    } else {
      let tmp = [];
      for (let i in menu.items) {
        const menus = menu.items[i];
        if (menus.use !== undefined) { //use 값이 있을 경우에만
          const chk = menus.use.includes(mode); //use값 안에 mode값과 일치하는 값이 있으면 true
          if (chk) {
            if (menus.items === undefined && menus.is_secret === undefined) { //하위 메뉴가 없을 경우
              tmp.push(menus);
            } else { //하위 메뉴가 있을 경우
              let sub_tmp = [];
              for (let j in menus.items) {
                const menus2 = menus.items[j];
                if (menus2.use !== undefined && menus2.is_secret === undefined) { //하위 메뉴에 use가 있을 경우
                  const chk2 = menus2.use.includes(mode); //use값 안에 mode값과 일치하는 값이 있으면 true
                  if (chk2) {
                    sub_tmp.push(menus2); //하위 메뉴를 임시 배열에 담음
                  }
                }
              }
              if (menus.is_secret === undefined) {
                menus.items = sub_tmp; //상위 메뉴 items에 하위 메뉴가 담긴 배열로 값을 지정
                tmp.push(menus);
              }
            }
          }
        }
      }
      this.items = tmp;
    }

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
              this.breadcrumbs.push({ text: items[i].title, disabled: false });
              this.breadcrumbs.push({ text: sub[j].title, disabled: false });
              this.setMenuHistory({title: sub[j].title, to: sub[j].to});
              this.title = this.default_title + '-' + sub[j].title;
            }
          }
        } else {
          if (path === items[i].to) {
            this.breadcrumbs.push({ text: items[i].title, disabled: false });
            this.setMenuHistory({title: items[i].title, to: items[i].to});
            this.title = this.default_title + '-' + items[i].title;
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
          if (!items[i].divider) {
            this.searchMenu.push({ title: items[i].title, value: items[i].to })
          }
        }
      }
    },
    selectMenu() {
      if (this.searchSelect) {
        this.$router.push(this.searchSelect.to);
        this.searchingMenu = false;
        this.searchSelect = null;
      }
    },
    setMenuHistory(v) {
      let check = true;
      const menuHistory = this.$store.getters['GET_MENU_HISTORY'];
      menuHistory.find((e) => {
        if (e.to === v.to) {
          check = false;
        }
      })
      if (check) {
        menuHistory.push(v);
        this.$store.commit('SET_MENU_HISTORY', menuHistory);
      }
    },
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