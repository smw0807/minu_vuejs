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