<template>
  <div>
    <div ref="root">This is a root element</div>
    <br>
    <refsTest ref="test1"/>
  </div>
</template>

<script>
import refsTest from './refs-test.vue';
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const root = ref(null);
    console.log(root);
    
    const test1 = ref(null);
    onMounted(() => {
      //DOM 요소는 초기 렌더링 후에 ref에 할당한다.
      console.log(root.value);
      console.log(test1); //vue2 처럼 ref를 이용해 해당 컴포넌트 안에 있는 함수 실행 가능한지 테스트해보기...
    })
    
    return { 
      root
    }
  },
  components: {
    refsTest
  }
}
</script>

<style>

</style>