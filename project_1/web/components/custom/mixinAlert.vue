<template>
  <v-card-text>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-btn @click="call_alert1">alert1</v-btn>
        </v-col>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-layout>
  </v-card-text>
</template>

<script>
/**
 * import하고 쓰는게 더 귀찮은듯.
 * 전역 mixin으로 사용하는게 더 나을까?
 */
import {alert_mixin} from '~/components/mixin/alert'
export default {
  mixins: [alert_mixin],
  data() {
    return {
    }
  },
  methods: {
    call_alert1() {
      console.log('call_alert1');
      const data = {
        type: 'info',
        title: 'mixin alert',
        text: 'mixin을 이용한 alert 컴포넌트 호출입니다.'
      };
      this.open_alert(data); //잘되긴함.
    }
  }
}
</script>

<style>

</style>