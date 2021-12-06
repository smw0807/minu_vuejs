<template>
  <v-card>
    <v-card-title>worker thread test</v-card-title>
    <v-card-text>
      <span>worker_thread 실행 개수 제한 및 큐 방식 테스트</span>
      <span>worker_thread 실행 개수 제한 및 큐 방식 테스트</span>
    </v-card-text>
    <v-card-text>
      <v-btn @click="make()">스레드 생성</v-btn>
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
    async make() {
      try {
        const rs = await this.$store.dispatch('worker_test/testWorker');
        console.log(rs);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style>

</style>