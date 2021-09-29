<template>
  <v-list dense>
    <v-subheader>Left Menu</v-subheader>
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="{path: item.to}"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{item.text}}
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
        { text: 'Home', to: '/' },
        { text: 'test1', to: 'test1' },
        { text: '데이터 송수신', to: 'test2' },
      ],
    }
  }
}
</script>

<style>

</style>