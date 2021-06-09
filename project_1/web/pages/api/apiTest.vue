<template>
  <v-layout column>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <test/>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import test from '~/components/api/test'
export default {
  data() {
    return {
      title : 'API Test Page',
    }
  },
  components: {
    test
  }
}
</script>

<style>

</style>