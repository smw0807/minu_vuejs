<template>
  <v-card>
    <v-card-title>
      <h2>{{ pageName }}</h2>
    </v-card-title>
    <v-card-text>
      <vuetify1 :cards="cards"/>
    </v-card-text>
  </v-card>
</template>

<script>
import vuetify1 from '~/components/vuetify/vuetify1'
export default {
  components: {
    vuetify1
  },
  data() {
    return {
      pageName: 'Vuetify1',
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ]
    }
  }
}
</script>

<style>

</style>