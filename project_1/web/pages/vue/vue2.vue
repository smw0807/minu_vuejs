<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="6">
          <element1/>
        </v-col>
        <v-col cols="6">
          <element2/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import element1 from '@/components/vue/element/element1'
import element2 from '@/components/vue/element/element2'
export default {
  components: {
    element1,
    element2,
  },
  data() {
    return {
      aa : 'aa',
      bb: ['b', 'bb', 'bbb'],
      cc : 11
    }
  },
  methods: {
    test() {
    }
  }
}
</script>

<style>

</style>