<template lang="">
  <div>
    Is run now...{{run}}
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    let run = ref(false);
    function isRun() {
      run = ref(true);
    }
    return {
      run, isRun,
    }
  }
}
</script>
<style lang="">
  
</style>