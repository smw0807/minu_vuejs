<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">
          <nuxt-link :to="{path: '/'}">{{web_name}}</nuxt-link>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y v-for="(menu, idx) in menus" :key="idx">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <span>{{menu.name}}</span>
          </v-btn>
        </template>

        <v-list v-if="menu.child">
          <v-list-item v-for="(child, idx2) in menu.sub" :key="idx2">
            <v-list-item-title>
              {{child.name}}
              <!-- <nuxt-link :to="{path: sub.path}">{{ sub.name }}</nuxt-link> -->
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-title>
              <nuxt-link :to="{path: menu.path}">{{ menu.name }}</nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-toolbar>
  </nav>

</template>

<script>
export default {
  data() {
    return {
      web_name: 'Nuxt Web',
      drawer: true,
      menus: [
        {
          name: 'Home',
          path: '/main',
          child: false
        },
        {
          name: '게시판',
          path: '/board/board',
          child: true,
          sub: {
            name: '게시판1',
            path: '/board/board'
          }
        },
        {
          name: 'test',
          path: '/main',
          child: false
        },
        {
          name: 'Vuetify',
          path: '/vuetify/vuetify1',
          child: true,
          sub: {
            name: 'vuetify1',
            path: '/vuetify/vuetify1'
          }
        },
        {
          name: 'API Test',
          path: '/api/test',
          child: true,
          sub: {
            name: 'API 1',
            path: '/api/test'
          }
        }
      ],
      menus1: [
        {no: 0, path: '/main', name: 'Home'},
        {no: 1, path: '/board/board', name: '게시판1'},
        {no: 2, path: '/vuetify/vuetify1', name: 'Vuetify'},
        {no: 3, path: '/api/test', name: 'API Test'}
      ],

    }
  },
  created() {

  },
  computed: {
    nowPage() {
      return this.$nuxt.$route.path;
    }
  }
}
</script>

<style>

</style>