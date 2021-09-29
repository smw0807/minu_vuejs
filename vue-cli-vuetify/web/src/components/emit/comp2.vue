<template>
  <v-card outlined>
    <v-card-title>자식 컴포넌트</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="10">
          <v-text-field v-model="text"></v-text-field>
        </v-col>
        <v-col cols="2" align="center">
          <v-btn @click="send">보내기</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          부모 컴포넌트로부터 props로 전달받은 vModelData 값 : {{ vModelData }}
        </v-col>
        <v-col cols="12">
          부모 컴포넌트로부터 props로 전달받은 sendData 값 : {{ sendData }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['vModelData', 'sendData'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    send() {
      console.log('부모 컴포넌트에게 보내기');
      this.$emit('getMsg', this.text);
    }
  }
}
</script>

<style>

</style>