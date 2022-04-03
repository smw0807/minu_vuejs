<template>
  <div>
    <div ref="root">This is a root element</div>
    <br>
    <refsTest ref="childComponent"/>
    <q-btn label="자식 컴포넌트 함수 실행하기" @click="runChildFunction()"/>
  </div>
</template>

<script>
import refsTest from './refs-test.vue';
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const root = ref(null);
    // console.log(root);
    
    //DOM 요소는 초기 렌더링 후에 ref에 할당한다.
    const childComponent = ref(null);
    onMounted(() => {
      // console.log(childComponent);
      
      // console.log('자식컴포넌트 데이터 가져오기 a : ', childComponent.value.a);
      // console.log('자식컴포넌트 데이터 가져오기 b : ', childComponent.value.b);
      // console.log('자식컴포넌트 데이터 가져오기 c : ', childComponent.value.c);

    })
    const runChildFunction = () => {
      // console.log('runChildFunction');
      childComponent.value.isRun({sendValue: 'sendValue!!'});
    }
    
    return { 
      root,
      childComponent,
      runChildFunction
    }
  },
  components: {
    refsTest
  }
}
</script>

<style>

</style>