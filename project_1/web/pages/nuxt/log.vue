<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <comp/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import comp from '@/components/nuxt/log'
export default {
  components: {
    comp
  },
  created() {
    console.log(this.$Log);
    // console.log(this.$nuxt);
    // this.$Log.info('page test');
  }

}
</script>

<style>

</style>