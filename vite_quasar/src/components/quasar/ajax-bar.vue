<template>
  <div class="q-pa-md">
    <q-ajax-bar 
      ref="bar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
      ></q-ajax-bar>

      <q-btn color="primary" label="Trigger" @click="trigger"></q-btn>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const bar = ref(null);

    function trigger() {
      const barRef = bar.value;
      /**
       * ref로 해당 컴포넌트에 접근해서 start, stop 함수를 실행해서
       * bar 이벤트의 시작과 끝을 정할 수 있음
       * bar는 기본적으로 왼쪽에서 오른쪽으로 가며, reverse 속성을 주면 오른쪽에서 왼쪽으로 감
       * 
       */
      barRef.start();
      setTimeout(() => {
        barRef.stop();
      }, Math.random() * 3000 + 1000);
    }

    return {
      bar,
      trigger
    }
  }
}
</script>

<style>

</style>