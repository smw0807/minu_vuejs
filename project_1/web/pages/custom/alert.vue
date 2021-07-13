<template>
  <v-layout column>

    <v-flex class="ma-4">
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
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  methods:{
    alert(){
      console.log('Button alert Click!');
      this.$store.dispatch('updateAlert', {
        alert: true, 
        title: 'Alert!!', 
        text:'aaaaaaaaa!!\nbbbbbbb!!',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>