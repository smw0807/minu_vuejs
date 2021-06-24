<template>
  <v-card outlined raise>
    <v-card-title>자식 컴포넌트</v-card-title>
    <v-card-text>
      Hi!...  {{title}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      text: '',
      test1: 'aaa',
      test2: 2,
      test3: {
        aa:'aa'
      },
      test4: [
        'aa', 'bb', 'cc'
      ],
      test5: [
        { aa: 'aa'},
        { aa: 'bb'},
      ]
    }
  },
  created() {
    console.log('created!');
  },
  methods: {
    func1() {
      console.log('run child component func1!!!');
    },
    func2(v) {
      console.log('run child component func2!!! : ', v);
      this.title = v;
    }
  }
}
</script>

<style>

</style>