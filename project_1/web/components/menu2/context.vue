<template>
  <v-card>
    <v-card-title>context</v-card-title>
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
const APP_LOG_LIFECYCLE_EVENTS = true;
export default {
  data() {
    return {
      check_context: null
    }
  },
  created(){
    console.log('created');
    console.log(this.$nuxt.context);
    console.log('config : ', this.$nuxt.context.config);
    console.log('online check : ', this.$nuxt.isOffline); //인터넷 연결 상태 확인 (true: 연결된 상태)
  },
  //생성 전 이벤트 로그
  beforeCreate: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("beforeCreate");
      }
  },
  //생성 후 이벤트 로그
  // created: function () {
  //     if (APP_LOG_LIFECYCLE_EVENTS) {
  //         console.log("created");
  //     }
  // },
  //마운트 전 이벤트 로그
  beforeMount: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("beforeMount");
      }
  },
  //마운트 후 이벤트 로그
  mounted: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("mounted");
      }
  },
  //업데이트 전 이벤트 로그
  beforeUpdate: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("beforeUpdate");
      }
  },
  //업데이트 후 이벤트 로그
  updated: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("updated");
      }
  },
  //소멸 전 이벤트 로그
  beforeDestroy: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("beforeDestroy ");
      }
  },
  //소멸 후 이벤트 로그
  destroyed: function () {
      if (APP_LOG_LIFECYCLE_EVENTS) {
          console.log("destroyed");
      }
  }

}
//Nuxt 어플리케이션 준비 완료 후 실행되는 함수. 
//사이트의 상호 작용 시간을 늘리지 않고 클라이언트 측에서 기능을 실행하려는 경우 유용 할 수 있습니다.
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
</script>

<style>

</style>