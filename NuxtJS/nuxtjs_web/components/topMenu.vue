<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">
          <nuxt-link :to="{path: '/'}">{{web_name}}</nuxt-link>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y open-on-hover v-for="(menu, idx) in menus" :key="idx">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-on="on" v-bind="attrs">
            <span>{{ menu.name }}</span>
          </v-btn>
        </template>

        <v-list v-if="menu.child">
          <v-list-item v-for="(child, idx2) in menu.sub" :key="idx2">
            <v-list-item-title>
              <nuxt-link class="btn" :to="{path: child.path}">{{ child.name }}</nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-title>
              <nuxt-link class="btn" :to="{path: menu.path}">{{ menu.name }}</nuxt-link>
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
            { name: 'API 1', path: '/api/test'}
          ]
        }
      ]
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