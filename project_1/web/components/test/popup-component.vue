<template>
  <v-card outline>
    <v-card-title>popup Component</v-card-title>
    <v-card-text>
      window.popup으로 컴포넌트 파일 띄우기..
    </v-card-text>
    <v-card-text>
      <v-btn @click="send">send!</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
if (opener) {
  console.log('popup opener check');
}
export default {
  created() {
    console.log('created : ' , opener);
    const test = opener.$nuxt.$store.getters['GET_CONFIG']; //부모 객체의 store 접근 방법
    console.log('check : ', test);
    const test2 = this.$store.getters['GET_CONFIG']; //이건 팝업뜨면서 store가 분리되가지고 안들어있는듯 안나옴
    console.log('chec2 : ', test2);
  },
  methods: {
    send() { //부모 객체에 있는 함수 실행하기
      console.log('send!');
      opener.receive_signal();
    }
  },
}
</script>

<style>

</style>