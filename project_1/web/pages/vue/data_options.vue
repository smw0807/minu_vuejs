<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-btn v-on:click="test1">this.$data</v-btn>
          <v-btn v-on:click="test2">this.$options</v-btn>
          <v-btn v-on:click="test3">data() update</v-btn>
          <v-btn v-on:click="test4">check</v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data1: '1111',
      data2: 2222,
      data3: {
        aaa: 'aaa',
        bbb: 'bbb',
        ccc: 333,
      },
      data4: ['123', '234', '345'],
      data5: [
        { text: 'text1', value: 1},
        { text: 'text2', value: 2},
        { text: 'text3', value: 3},
      ]
    }
  },
  methods: {
    test1() {
      //data() 안에 객체들 가지고 와줌 (최신 데이터)
      console.log(this.$data);
    },
    test2() {
      //이 컴포넌트에 있는 정보들을 가져올 수 있는 것 같음. (변경시키기 전 최최 데이터를 가지고 있는듯?)
      console.log(this.$options.data());
      console.log(this.$options.methods);
    },
    test3() {
      this.data1 = '2222';
      this.data2 = 5555;
      this.data3.bbb = 'ccc';
      this.data4 = ['555'];
    },
    test4() {
      console.log('--------------S');
      // console.log(this.$data); //변경된 데이터를 가지고 있음
      // console.log(this.$options.data()); //기존 데이터 가지고 있음.
      console.log(JSON.stringify(this.$data)); //변경된 데이터를 가지고 있음
      console.log(JSON.stringify(this.$options.data())); //기존 데이터 가지고 있음.
      console.log('--------------E');
    }
  }
}
</script>

<style>

</style>