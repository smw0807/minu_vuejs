<template>
  <v-card>
    <v-card-title>worker thread test</v-card-title>
    <v-card-text>
      워커로 csv 파일 생성 시키기....
    </v-card-text>
    <v-card-text>
      <v-btn @click="download">다운로드</v-btn>
    </v-card-text>
    <v-card-text>
      <!-- <v-btn href="/file/위협검색.csv" :download="test()">파일 다운로드</v-btn> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    async download() {
      try {
        const rs = await this.$store.dispatch('worker_test/runWorker', {test1: '11', test2: '22', test3: ['11','22']});
        console.log('download : ', rs);
      } catch (err) {
        console.error(err);
      }
    },
    test() {
      console.log("??");
    }
  }
}
</script>

<style>

</style>