<template>
  <v-container fluid>
    <v-layout column class="ma-1">
      <v-row>
        <v-col>
          <obj :obj="objData"/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import obj from '~/components/test/obj-props'
export default {
  data() {
    return {
      objData: {
        a: 'aaa',
        b: 'bbb',
        c: {
          cc1: 'cc1',
          cc2: 'cc2'
        },
        d: ['d1', 'd2', 'd3']
      }
    }
  },
  components: {
    obj,
  },
  mounted() {
    console.log('parent : ', this.objData);
  },
}
</script>

<style>

</style>