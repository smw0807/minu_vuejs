<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>alert 컴포넌트 줄바꿈 테스트</v-card-title>
            <v-card-text>
              <p>기존에 만든 alert 컴포넌트가 줄바꿈이 안되는게 있어서 수정 필요...</p>
              <v-btn @click="alert">Alert!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>alert 컴포넌트 promise처리</v-card-title>
            <v-card-text>
              <pre>
원래 alert이 뜨면 버튼을 누르기 전까지 다음 코드 실행이 안되는데. 내가 만든건 그걸 고려하지 않고 만들어서
alert 컴포넌트는 띄우고 바로 다음 코드로 진행되는 것 때문에 promise를 이용해서 새로 만들어봄.
              </pre>
              <async-alert ref="alert"/>
              <v-btn @click="open">ALERT!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>

  </v-container>
</template>

<script>
import asyncAlert from '~/components/cmn/asyncAlert'
export default {
  components: {
    asyncAlert,
  },
  methods:{
    alert(){
      this.$store.dispatch('updateAlert', {
        alert: true, 
        title: 'Alert!!', 
        text:'aaaaaaaaa!!\nbbbbbbb!!',
        type: 'success'
      })
      alert('test!');
      //alert이 먼저 뜨고 확인 누르면 alert 컴포넌트가 출력됨. (순서 안맞음)
    },
    async open() {
        await this.$refs.alert.open({
          type: 'success',
          title: 'async Alert!!',
          text:'aaaaaaaaaa!!!\nbbbbbbbbbb!!'
        });
        alert('test!');
        //alert 컴포넌트가 먼저 뜨고 확인 누르면 alert이 출력됨
    },
  }
}
</script>

<style>

</style>