<template>
  <v-layout column>
    <v-flex class="mt-4 ml-9">
      <v-row>
        <v-col cols="12" align="start">
          <h2>부모 컴포넌트에서 자식 컴포넌트 함수 실행</h2>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex class="ma-4">
      <v-row class="px-4">
        <v-col cols="12">
          <v-card outlined>
            <v-card-title>부모 컴포넌트</v-card-title>
            <v-card-text>
              <test ref="childComponent"/>
            </v-card-text>
            <v-card-text>
              <v-btn @click="run">run1!!</v-btn>
              <v-btn @click="run2(true)">run2!!</v-btn>
              <v-btn @click="run2(test)">run3!!</v-btn>
              <v-btn @click="getData">get!!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import test from '~/components/test1'
export default {
  data() {
    return {
      test: 'Parent data...',
    }
  },
  components:{
    test
  },
  methods: {
    run() {
      console.log('btn run : ', this.$refs.childComponent);
      this.$refs.childComponent.func1();
    },
    run2(v) {
      console.log('btn run2 : ', this.$refs.childComponent);
      console.log(v);
      this.$refs.childComponent.func2(v);
    },
    getData() {
      const test1 = this.$refs.childComponent.test1;
      const test2 = this.$refs.childComponent.test2;
      const test3 = this.$refs.childComponent.test3;
      const test4 = this.$refs.childComponent.test4;
      const test5 = this.$refs.childComponent.test5;
      console.log('test1 : ', test1);
      console.log('test2 : ', test2);
      console.log('test3 : ', test3);
      console.log('test4 : ', test4);
      console.log('test5 : ', test5);
    },
  }
}
</script>

<style>

</style>