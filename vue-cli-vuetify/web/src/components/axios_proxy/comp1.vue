<template>
  <v-card>
    <v-card-title>axios와 proxy 테스트</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          Result
        </v-col>
        <v-col cols="12">
          {{result}}
        </v-col>

        <v-col cols="12">
          <v-divider/>
        </v-col>

        <v-col cols="12">
          <v-btn full-width @click="api">vuex/actions로 요청 보내기</v-btn>
        </v-col>
        <v-col cols="12">
          {{result2}}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      result2: '',
    }
  },
  async created() {
    // console.log();
    try {
      const test = await this.$axios.post('/api1/test');
      this.result = test;
      // const test = await this.$axios.post('/api2/test');
      console.log('test3/comp1 -> created : ', test);
    } catch (err) {
      console.error('test3/comp1 -> created error : ', err);
    } 
  },
  methods: {
    async api() {
      try {
        const test = this.$store.dispatch('api_test');
        console.log(test);
      } catch (err) {
        console.error('test3/comp1 -> actions error : ', err);
      }
    }
  }
}
</script>

<style>

</style>