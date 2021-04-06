<template>
  <v-navigation-drawer 
    v-model="drawer"
    :clipped="clipped"
    fixed
    dark
    permanent
    >
    <v-list
      dense
      nav
      class="py-0"
      >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      clipped: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      right: false,
      permanent: false,
      miniVariant: false,
      expandOnHover: false,
      background: false,
    }
  },
}
</script>

<style>

</style>