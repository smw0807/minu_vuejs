<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  data() {
    return {
      text: 'bbb',
    };
  },
  // data: () => ({
  //   text: 'aaa',
  // }),
  created() {
    this.test();
  },
  methods: {
    test() {
      //vue 인스턴스에 접근 안돼서 undefined
      setTimeout(function () {
        console.log(this.text);
      }, 1000);
      // 나옴
      setTimeout(() => {
        console.log(this.text);
      }, 1000);
    },
  },
};
</script>

<style>
</style>