<template>
  <div>
    <v-layout column>
      <v-row>
        <v-col cols="3" v-for="(item, index) in idx_infos" :key="index">
          <v-card >
            <v-card-title>{{item.index_type}}</v-card-title>
            <v-card-text>
              데이터 수 : {{item.doc_count | ft_makeComma}} 개
              <br>
              데이터 용량 : {{item.size | ft_byteToSize}}
            </v-card-text>
            <v-card-actions align="end">
              <v-btn
                small
                @click="detail(item.indices)"
                >
                <v-icon>mdi-magnify</v-icon>
                상세보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['ping'],
  async mounted() {
    // if (this.ping) {
      await this.$store.dispatch('els_info/getIdxInfos');
    // }
  },
  computed: {
    idx_infos() {
      return this.$store.getters['els_info/GET_IDX']
    }
  },
  methods: {
    detail(v) {
      console.log('detail', v);
    }
  },
}
</script>

<style>

</style>