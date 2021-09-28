<template>
  <v-card>
    <v-card-title>vue-ctk-date-time-picker + vuetify month picker</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="2">
          <v-select
            :items="sel"
            label="검색 타입"
            item-text="text"
            item-value="value"
            v-model="date_type"
          ></v-select>
        </v-col>
        <v-col cols="10">
          <date-time-picker @set-date="setDate" :type="date_type" />
        </v-col>
        <v-col cols="2">전달받은 날짜 : </v-col>
        <v-col cols="6">{{ select_date }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * 하나의 컴포넌트에 npm으로 설치한 vue-ctk-date-time-picker 컴포넌트와 뷰티파이의 월별 컴포넌트를 합치고
 * 셀렉트박스에 선택한 값에 따라 다른 달력을 보여주게 만들었음.
 * 값을 선택하면 this.$emit을 이용해 선택된 값을 받을 수 있는 컴포넌트를 만드려고 했는데
 * 뷰티파이는 버튼에 이벤트를 줘서 선택한 값 보내서 받을 수 있지만
 * 저 ctk 컴포넌트는 버튼에 이벤트를 주는 방법을 도저히 못찾겠다.
 * 관련 깃허브를 확인해봐도 해당 컴포넌트의 props 정보만 여러개있고, 이벤트는 몇개 없는데, 버튼 이벤트 관련된건 없다.
 * 슬롯 기능도 없어서 방법을 모르겠음.
 */
import dateTimePicker from '@/components/vpicker/datetimepicker'
export default {
  data() {
    return {
      sel: [
        { text: '일별', value: 'day' },
        { text: '월별', value: 'month' },
      ],
      date_type: 'day',
      select_date: null
    }
  },
  components: {
    dateTimePicker
  },
  methods: {
    setDate(v) {
      console.log('전달받은 날짜 : ', v);
      this.select_date = v;
    }
  }
}
</script>

<style>

</style>