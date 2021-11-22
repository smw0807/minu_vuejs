<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <props-test/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import propsTest from '@/components/vue/props/props1'
export default {
  components: {
    propsTest,
  }
}
</script>

<style>

</style>