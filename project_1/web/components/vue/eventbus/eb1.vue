<template>
  <v-card>
    <v-card-title>EventBus, event 사용해보기...</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          EventBus로 받은 텍스트 : {{ text }}
        </v-col>
        <v-col cols="12">
          <children @send2="test"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import children from '@/components/vue/eventbus/eb2'
/**
 * 이렇게 컴포넌트마다 따로따로 vue 선언 후 EventBus를 생성해서 사용하면 작동이 안됨
 * 자식 컴포넌트에서 보낸거 받질 못함
 */
// import Vue from 'vue'
// const EventBus = new Vue();


/**
 * EventBus를 모듈로 만들어서 사용해야함....
 * 그리고 양쪽 다 같은 모듈을 바라봐야함
 */
import EventBus from '@/plugins/eventBus'
export default {
  data() {
    return {
      text: ''
    }
  },
  components:{
    children
  },
  created() {
    EventBus.$on('send', (res) => {
      console.log('자식 컴포넌트가 EventBus로 보낸 데이터 받기 : ', res);
      this.text = res;
    })
  },
  methods: {
    test(v) {
      console.log('this.$on : ', v);
      this.text = v;
    }
  }
}
</script>

<style>

</style>