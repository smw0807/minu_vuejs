<template>
  <v-layout colum>
    <v-flex class="ma-4">
      <v-row class="px-3">
        <v-card width="100%">
          <v-card-text>
            ElasticSearch 데이터를 이용한 VuetifyJS treeview
          </v-card-text>
        </v-card>
      </v-row>
      <v-row>
        <v-col cols="4">
          <tree/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import tree from '~/components/treeview/treeview'
export default {
  components:{
    tree
  }
}
</script>

<style>

</style>