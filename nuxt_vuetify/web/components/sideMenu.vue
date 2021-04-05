<template>
  <v-navigation-drawer
      expand-on-hover
      permanent
      fixed
      :clipped="clipped"
      v-model="drawer"
      app
      :width="180"
    >
    <v-list>
      <v-list-tile
        router
        :to="item.to"
        :key="i"
        v-for="(item, i) in items"
        exact
      >
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        { icon: '', title: 'Test1', to: '/test1' }
      ]
    }
  }
}
</script>

<style>

</style>