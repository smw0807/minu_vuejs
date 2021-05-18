<template>
  <v-card>
    <v-card-title>
      <h3>{{ pageName }}</h3>
    </v-card-title>
    <v-card-text>
      <v-card raised outlined class="pa-3">
        <list/>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import list from '~/components/aggrid/list2'
export default {
  created() {
    // this.$store.dispatch('threat/monitoring/initList');
  },
  data() {
    return {
      pageName : '일반 그리드'
    }
  },
  components: {
    list
  }
}
</script>

<style>

</style>