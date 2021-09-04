<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title>alert 컴포넌트 줄바꿈 테스트</v-card-title>
            <v-card-text>
              <p>기존에 만든 alert 컴포넌트가 줄바꿈이 안되는게 있어서 수정 필요...</p>
              <v-btn @click="alert">Alert!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
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

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>mixin을 이용한 alert 컴포넌트 사용</v-card-title>
            <v-card-text>
              alert 공용 컴포넌트를 만들고 사용하면서 생각하게된게 사용하기 위해선 store에 요청을 보내는 방식으로<br>
              <code>this.$store.dispatch('updateAlert', {alert: true, type: 'error', title: 'title', text:'text'});</code><br>
              이런 식으로 작성해서 띄우도록 했지만, 이렇게 솔직히 귀찮은데 더 쉽게 사용하는 방법은 없을까?<br>
              하는 생각으로 mixin을 사용하면 어떨까?해서 한번 만들어봤다.
            </v-card-text>
            <mixinAlert/>
            <v-card-text>
              layout/default.vue에 mixin 선언해놓은 것도 사용가능 한지 테스트
              <v-btn @click="test">test</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>mixin 테스트</v-card-title>
            <v-card-text>
              위 방식은 alert 컴포넌트에 대해 store 요청 처리를 믹스인으로 만든거였는데, 
              alert 컴포넌트 소스 자체를 믹스인으로 만들어서 사용해보고 싶어서 해봄
            </v-card-text>
            <v-card-text>
              <mixinAlert2/>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>

  </v-container>
</template>

<script>
import asyncAlert from '~/components/cmn/asyncAlert'
import mixinAlert from '~/components/custom/mixinAlert'
import mixinAlert2 from '@/components/custom/mixinAlert2'
export default {
  components: {
    asyncAlert,
    mixinAlert,
    mixinAlert2,
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
    test() {
      // const data = {
      //   type: 'info',
      //   title: 'mixin alert',
      //   text: 'pages vue 파일에서 layout 쪽 mixin으로도 사용되는지 확인'
      // };
      // this.open_alert(data);  //안됨
      console.log('안됨')
    }
  }
}
</script>

<style>

</style>