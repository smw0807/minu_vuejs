<template lang="">
  <div>
    <div v-for="(item, idx) in list" :ref="el => {if (el) divs[i] = el}">
      {{ item }}
    </div>
  </div>
</template>
<script>
import { ref, reactive, onBeforeUpdate } from 'vue';
export default {
  setup() {
    const list = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const divs = ref([]);

    //각 업데이트 전에 refs를 재설정?
    onBeforeUpdate(() => {
      console.log(divs)
      // divs.value = [];
    })

    return {
      list,
      divs
    }
  }
}
</script>
<style lang="">
  
</style>