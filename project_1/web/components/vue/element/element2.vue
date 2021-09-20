<template>
  <v-card>
    <v-card-title>부모 컴포넌트 인스턴스에 접근하기</v-card-title>
    <v-card-text>
      <code>this.$parent....</code>
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
 * 부모 컴포넌트 인스턴스 접근
 * https://kr.vuejs.org/v2/guide/components-edge-cases.html#%EB%B6%80%EB%AA%A8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B8%B0
 */
export default {
  created() {
    console.log('element2 created : ', this.$parent.aa);//됨
    console.log('element2 created : ', this.$parent.bb);//됨
    console.log('element2 created : ', this.$parent.cc);//됨
  },
  mounted() {
    console.log('element2 mouted : ', this.$parent.aa);//됨
    console.log('element2 mouted : ', this.$parent.bb);//됨
    console.log('element2 mouted : ', this.$parent.cc);//됨
  },
  methods: {
    test1() {
      console.log('element2 methods : ', this.$parent.aa);//됨
      console.log('element2 methods : ', this.$parent.bb);//됨
      console.log('element2 methods : ', this.$parent.cc);//됨
    }
  },
}
</script>

<style>

</style>