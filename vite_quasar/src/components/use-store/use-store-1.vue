<script>
import { inject, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(props, context) {
    console.log('context : ', context);
    const store = useStore();
    console.log('store : ', store);
    console.log('store : ', store.getters['rootState']);
    console.log('store : ', store.getters['tmp/framework']);
    // const store = inject('$store');
    // console.log('store : ', store);
    // console.log('store : ', store.getters['rootState']);
    // console.log('store : ', store.getters['tmp/framework']);
    const state = reactive({
      rootState: computed(() => store.getters['rootState'])
    })

    const updState = async () => {
      store.commit('rootState', 'bbb');
      try {
        const rs = await store.dispatch('tmp/framework');
        console.log('dispatch : ', rs);
      } catch (err) {
        console.error(err);
      }
    }

    onMounted(() => {
      store.commit('rootState', 'ccc');
    })
    return {
      state, updState
    }
  }
}
/**
 * compositionAPI에서는 this를 못써서 this.store나 전역설정한 this.axios를 못쓴다....
 * vue 파일마다 import후 처리하거나, main.js에서 provide/inject를 선언해서 사용해야하는데
 * 과연 이게 optionsAPI 보다 좋은게 맞는걸까? 하는 생각이 든다.
 * 기존엔 main.js에서 사전 작업하면 vue 파일에서는 this.store 이런 식으로 사용이 가능했는데
 * 입력하는 코드가 추가되는 게 아닌가...? 내가 아직 완벽하게 파악을 못한건지 모르겠다.
 * compositionAPI를 아직까진 받아들이기가 힘들다
 * this. 를 일일이 붙일 필요가 없어져서 보기가 더 나을수도 있을까?
 * 
 */
</script>

<template>
  <div class="row">
    <div class="col">
      {{state.rootState}}
    </div>
    <div class="col">
       <q-btn @click="updState" label="store 데이터 바꾸기"/>
    </div>
  </div>
</template>

<style>
</style>