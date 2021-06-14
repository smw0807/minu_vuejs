<template>
  <v-sheet
    max-width="96%"
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
  </v-sheet>
</template>

<script>
export default {
  props:{
    menus: {
      type: Array
    }
  },
  computed: {
    items() {
      return this.menus;
    }
  },
  methods: {
    click(v) {
      this.$nuxt.$router.push(v);
    },
    close(v) {
      this.$emit('closeMenu', v);
    }
  },
}
</script>

<style>

</style>