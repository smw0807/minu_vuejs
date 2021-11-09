<template>
  <v-card>
    <v-card-title>nuxt-winston-log</v-card-title>
    <v-card-subtitle>log 출력 및 파일 생성</v-card-subtitle>
    <v-card-text>
      로그 테스트
      <!-- <div v-for="(num, idx) in nums" :key="idx">
        {{num}} , {{idx}}
        <div v-if="idx == nums.length - 1">
          last
        </div>
      </div> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      nums: [1,2,3,4,5,6]
    }
  },
  created() {
    // this.$Log().info('component log test');
  },
  mounted() {
  },
}
</script>

<style>

</style>