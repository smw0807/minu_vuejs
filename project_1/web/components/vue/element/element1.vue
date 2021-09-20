<template>
  <v-card>
    <v-card-title>루트 엘리먼트에 접근</v-card-title>
    <v-card-text>
      <code>this.$root.....</code>
      <v-layout column>
        <v-row>
          <v-col cols="6">
            <v-btn @click="test1">test1</v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * 루트 엘리먼트에 접근하기
 * 선호하는 방법은 아니므로 최대한 사용은 자제하고 vuex를 사용하길 권장
 * https://kr.vuejs.org/v2/guide/components-edge-cases.html#%EB%A3%A8%ED%8A%B8-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B8%B0
 */
export default {
  created() {
    console.log('상위 객체 접근 : ', this.$root);
    // console.log('상위 객체 접근 : ', this.$root.aa); //이건안되네
  },
  mounted() {
    console.log('mouted: ', this.$root.aa); //안됨
    console.log('mouted: ', this.$root.aaa); //안됨
  },
  methods: {
    test1() {
      const test1 = this.$root.aa;
      console.log('methods test1 > test1 : ', test1);
      const test2 = this.$root.aaa;
      console.log('methods test1 > test2 : ', test2);
    }
  }
}
/**
 * 루트 인스턴스가 아니라 상위 컴포넌트라 접근이 안되는 것 같은데
 * nuxt에서는 루트 인스턴스에 값을 어떻게 넣지??
 */
</script>

<style>

</style>