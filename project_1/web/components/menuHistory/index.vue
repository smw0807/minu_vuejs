<template>
  <v-sheet
    max-width="97.5%"
   >
    <v-slide-group
      show-arrows
      >
      <v-slide-item
        v-for="(item, index) in items" :key="index"
        >
        <v-chip
          class="mx-1"
          :class="$nuxt.$route.path === item.to ? 'info' : ''"
          rounded
          depressed
          @click="click(item.to)"
          close
          small
          @click:close="close(index)"
          >
          {{ item.title }}
        </v-chip>
      </v-slide-item>
    </v-slide-group>

    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      top
      right
      >
      {{text}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: '현재 페이지는 닫을 수 없습니다.',
    }
  },
  computed: {
    items() {
      return this.$store.getters['GET_MENU_HISTORY'];
    }
  },
  methods: {
    click(v) {
      this.$nuxt.$router.push(v);
    },
    close(v) {
      const menus = this.$store.getters['GET_MENU_HISTORY'];
      if (this.$nuxt.$route.path === menus[v].to) {
        this.snackbar = true
      } else {
        menus.splice(v, 1);
        this.$store.commit('SET_MENU_HISTORY', menus);
      }
    }
  },
}
</script>

<style>

</style>