<template>
  <v-card outlined>
    <v-card-title>하위 컴포넌트</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="text"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="send">EventBus</v-btn>
      <v-btn @click="send2">event</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * 이렇게 컴포넌트마다 따로따로 vue 선언 후 EventBus를 생성해서 사용하면 작동이 안됨
 */
// import Vue from 'vue'
// const EventBus = new Vue();

/**
 * EventBus를 모듈로 만들어서 사용해야함....
 */
import EventBus from '@/plugins/eventBus'
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    send() {
      console.log('EventBus.$Emit을 이용해 부모로 전송 : ', this.text);
      if (this.text === '') {
        this.$store.dispatch('updateAlert', {
          alert: true,
          title: 'EventBus.$emit',
          text: '텍스트를 입력해주세요.',
          type: 'error'
        });
      } else {
        EventBus.$emit('send', this.text);
      }
    },
    send2() {
      console.log('this.$emit을 이용해 부모로 전송 : ', this.text);
      if (this.text === '') {
        this.$store.dispatch('updateAlert', {
          alert: true,
          title: 'this.$emit',
          text: '텍스트를 입력해주세요.',
          type: 'error'
        });
      } else {
        //todo : 이거 vue-cli에서도 되는지 내일 꼭 해보기
        this.$emit('send2', this.text);
      }
    }
  },
}
</script>

<style>

</style>