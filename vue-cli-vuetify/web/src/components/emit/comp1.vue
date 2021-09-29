<template>
  <v-card outlined>
    <v-card-title>부모 컴포넌트</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="10">
          <v-text-field v-model="text"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn @click="send">보내기</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <comp2 :vModelData="text" :sendData="text2" @getMsg="getData"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          자식 컴포넌트로부터 전달받은 값 : {{ text3 }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * v-model text를 comp2 컴포넌트의 props로 지정하면 입력할때마다 바로바로 넘어감
 * v-model로 양방향 데이터 바인딩으로 되어 있지 않고 버튼을 눌러야 데이터가 셋팅되도록 한 text2는
 * 버튼을 누르는 순간 넘어감. 양방향이 아니라 text의 값이 바껴도 변하지 않음. 눌러야 변경된 값을 넘김
 */
import comp2 from '@/components/emit/comp2'
export default {
  components: {
    comp2
  },
  data() {
    return {
      text: '',
      text2: '',
      text3: '',
    }
  },
  methods: {
    send() {
      console.log('자식 컴포넌트에게 보내기'); 
      this.text2 = this.text;
    },
    getData(v) {
      console.log('자식 컴포넌트로부터 받은 데이터 : ', v);
      this.text3 = v;
    }
  }
}
</script>

<style>

</style>