<template lang="">
  <div>
    Is run now...{{run}}
  </div>
</template>
<script>
import { ref , toRefs} from 'vue';
export default {
  setup() {
    let run = ref(false);
    let a = ref('aaaa');
    let b = ref('bbbb');
    let c = ref(1234);
    const isRun = (v) => {
      console.log('isRun');
      console.log('부모 컴포넌트에게 받은 값: ', v);
      run = ref(true);
    }
    // console.log('run : ' , run);
    return {
      run, 
      a,
      b,
      c,
      isRun,
    }
  }
}
</script>
<style lang="">
  
</style>