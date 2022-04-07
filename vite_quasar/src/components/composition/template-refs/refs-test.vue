<template lang="">
  <div>
    Is run now...{{data.run}}
  </div>
</template>
<script>
import { ref , toRefs, reactive} from 'vue';
export default {
  setup() {
    const data = reactive({
      run: false
    })
    let run = false;
    console.log(run);
    let a = ref('aaaa');
    let b = ref('bbbb');
    let c = ref(1234);
    const isRun = (v) => {
      console.log('isRun');
      console.log('부모 컴포넌트에게 받은 값: ', v);
      data.run = true;
      console.log(run);
    }
    // console.log('run : ' , run);
    return {
      data,
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