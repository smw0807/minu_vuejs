<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">
        <v-btn @click="alert_open_1">일반 alert</v-btn>
        <v-btn @click="alert_open_2">싱크 alert</v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
/**
 * 기존에 만들어서 사용해봤던 alert 컴포넌트를 그냥 믹스인 파일로 만들어서 
 * store를 거치지 않고 컴포넌트 내에서 처리하게 해보기
 * 데이터는 잘 넘어가는데 안열림...
 * 아 template는 안된다... 함수만 된다...
 */
import {alert} from '~/components/mixin/alert'
export default {
  mixins: [alert],
  methods: {
    alert_open_1() {
      const params = {
        type: 'error',
        title: 'mixin alert',
        text: '믹스인을 이용한 alert',
      }
      this.alert_open(params);
    },
    alert_open_2() {

    }
  }
}
</script>

<style>

</style>