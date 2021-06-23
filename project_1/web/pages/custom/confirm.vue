<template>
  <v-layout column>
    
    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>공용 confirm 컴포넌트 만들어보기</v-card-title>
            <v-card-text>
              <v-btn @click="go">confirm go!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  methods:{
    go() {
      console.log('go!');
      //1. store를 이용해 confirm 컴포넌트를 실행시킴
      // const rs = ... 

      //2. Ok 누르면 if문 정상적으로 타고 Cancel 누르면 else문 타게하기
      // if (rs) {

      // } else {

      // }
      //... 어떻게 하면 만들수 있을까...?
    }
  }
}
</script>

<style>

</style>