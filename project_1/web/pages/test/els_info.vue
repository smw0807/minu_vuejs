<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="refresh"
            >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <node-infos :ping="ping"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <idx-infos :ping="ping"/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import nodeInfos from '@/components/test/els/node_data_usage'
import idxInfos from '@/components/test/els/idx_data_usage'
export default {
  components: {
    nodeInfos, idxInfos
  },
  computed: {
    ping() {
      return this.$store.getters['els_info/GET_PING'];
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('els_info/elsPingCheck');
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async refresh(){ 
      await this.$store.dispatch('els_info/getNodeInfos');
      await this.$store.dispatch('els_info/getIdxInfos');
    }
  },
}
</script>

<style>

</style>