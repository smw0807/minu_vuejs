<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
//icon
import { Search } from '@element-plus/icons-vue';

//========== select ======================================================= S
interface gameType {
  label: string; // UI에 표시할 값
  value: string;
}
const defaultGameType: string = 'steam'; //기본 값
const _lsGameType: Ref<string> = ref(localStorage.getItem('zz_gameType')); //로컬스토리지 값 가져오기
const selGameType: Ref<string> = ref(_lsGameType);
const gameTypes: Ref<gameType[]> = ref([
  //셀렉트박스 options 데이터
  { label: '스팀', value: 'steam' },
  { label: '카카오', value: 'kakao' },
]);
//셀렉트박스 값 변경 이벤트
const changeGameType = (v: string): void => {
  localStorage.setItem('zz_gameType', v);
};
//========== select ======================================================= E

//닉네임
const userNickName: Ref<string> = ref('');

//todo 검색 요청
const searchUser = (): void => {
  const params = {
    type: selGameType.value,
    name: userNickName.value,
  };
  console.log(params);
};

onMounted(() => {
  if (!_lsGameType) {
    //로컬스토리지 아이템이 없으면 셋팅
    localStorage.setItem('zz_gameType', defaultGameType);
    selGameType.value = defaultGameType;
  }
  userNickName.value = '';
});
</script>

<template>
  <div>
    <el-row>
      <el-col align="middle">
        <el-input
          v-model="userNickName"
          placeholder="게임 닉네임을 입력해주세요"
          class="input-with-select"
          size="large"
          style="width: 500px"
        >
          <template #prepend>
            <!-- el-input 안에 slot 형식으로 el-select는 뭔가 다른거 같음 :change 기능이 안됨 -->
            <el-select
              v-model="selGameType"
              @change="changeGameType"
              style="width: 115px"
              size="large"
            >
              <el-option
                v-for="item in gameTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template #append>
            <!-- el-input 안에 slot 형식으로 el-button도 뭔가 다른거 같음 버튼색 변경하는 type 옵션이 안됨 -->
            <el-button :icon="Search" @click="searchUser" size="large" />
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>