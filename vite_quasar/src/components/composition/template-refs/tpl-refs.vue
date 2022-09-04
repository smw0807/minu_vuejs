<template>
  <div>
    <div ref="root">This is a root element</div>
    <br />
    <refsTest ref="childComponent" />
    <q-btn label="자식 컴포넌트 함수 실행하기" @click="runChildFunction()" />
    <q-btn label="router test" @click="routerTest()" />
  </div>
</template>

<script>
import refsTest from './refs-test.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
    });
    const runChildFunction = () => {
      // console.log('runChildFunction');
      childComponent.value.isRun({ sendValue: 'sendValue!!' });
    };

    const router = useRouter();
    const routerTest = () => {
      console.log('router test');
      router.push('/use-store');
    };

    return {
      root,
      childComponent,
      runChildFunction,
      routerTest,
    };
  },
  components: {
    refsTest,
  },
};
</script>

<style>
</style>