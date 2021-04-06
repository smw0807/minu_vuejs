<template>
  <v-container
    class="grey lighten-5 mb-6"
    align-v="left"
  >
    <v-row
    justify="space-around"
    no-gutters
    >
      <v-col>
        <v-btn 
          depressed 
          color="indigo"
          @click="test1"
        >
          proxy 1 test
        </v-btn>

        <v-btn
          depressed
          color="primary"
          @click="test2"
        >
          proxy 2 test
        </v-btn>

        <v-btn
          depressed
          color="error"
          @click="test3"
        >
          proxy 3 test
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
  
</template>

<script>
export default {
  methods: {
    async test1() {
      console.log('test1');
      try {
        await this.$axios.post('/nct/');
      } catch (err) {
        console.log('err : ', err);
      }
    },
    async test2() {
      console.log('test2');
      try {
        let rs = await this.$axios.post('/api/es/test_idx', {idx: 'test_idx'});
        console.log('response : ', rs);
      } catch (err) {
        console.log('err : ', err);
      }
    },
    async test3() {
      console.log('test3');
      try {
        let rs = await this.$axios.post('/api/mg/');
        console.log('response : ', rs);
      } catch (err) {
        console.log('err : ', err);
      }
    }
  }
}
</script>

<style>

</style>