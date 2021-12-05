<template>
  <v-card>
    {{node_infos}}
  </v-card>
</template>

<script>
export default {
  props: ['ping'],
  async mounted() {
    // if (this.ping) {
      await this.$store.dispatch('els_info/getNodeInfos');
    // }
  },
  computed: {
    node_infos() {
      return this.$store.getters['els_info/GET_NODE']
    }
  }
}
</script>

<style>

</style>