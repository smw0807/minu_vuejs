<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

//======= select 관련 ============== S
const defaultGameType: string = 'steam'; //기본 값
const _lsGameType: Ref<string>= ref(localStorage.getItem('zz_gameType'));
const selGameType: Ref<string> = ref(_lsGameType);
const gameTypes: Ref<Object> = ref([
  { label: '카카오', value: 'kakao'},
  { label: '스팀', value: 'steam'},
])
const selectGameType = (v: Object) => {
  selGameType.value = v['value'];
  localStorage.setItem('zz_gameType', v['value']);
}
//======= select 관련 ============== E

//======= input 관련 ============== S
const inputValue: Ref<string> =  ref('');
const inputReset = () => {
  inputValue.value = '';
}
//======= input 관련 ============== E


onMounted(() => {
  //로컬스토리지-게임타입이 없으면 기본값 설정
  if (!_lsGameType.value) {
    selGameType.value = defaultGameType;
    localStorage.setItem('zz_gameType', defaultGameType);
  }
})
</script>

<template>
  <div>
    <ui-select
      outlined
      v-model="selGameType"
      :options="gameTypes"
      @selected="selectGameType"
    >게임서버</ui-select>

    <ui-textfield
      v-model="inputValue"
      outlined
      with-trailing-icon
    >Your NickName</ui-textfield>

    <ui-button outlined icon="search">
      검색</ui-button>
  </div>

</template>

<style scoped>
</style>