<template>
  <v-list dense>
    <v-subheader>LEFT</v-subheader>
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="{path: item.to}">{{item.text}}</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Home', icon: 'mdi-clock', to: '/' },
        { text: 'test1', icon: 'mdi-clock', to: 'test1' },
      ],
    }
  }
}
</script>

<style>

</style>