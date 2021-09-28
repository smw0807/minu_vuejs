<template>
  <div>
    <template v-if="type === 'day'">
      <VueCtkDateTimePicker 
        v-model="date_time"
        input-size="sm"
        noHeader
        noLabel
        noClearButton
        format="YYYY-MM-DD HH:mm:ss"
        formatted="YYYY-MM-DD HH:mm:ss"
        button-now-translation="현재시간"
        :dark="this.$vuetify.theme.dark"
        >
        <!-- no-button -->
        </VueCtkDateTimePicker>
        <!-- <v-btn color="primary" @click="date_search(s_date)">선택</v-btn>
        <v-btn text outlined color="primary" @click="menu1 = false">취소</v-btn> -->
        <!-- 
          이거 버튼에 대해 따로 커스텀이 불가능한 것 같음.
          버튼에 따로 이벤트를 줘서 v-model 값을 this.$emit으로 보내고 싶은데 안됨
          해당 깃허브에도 정보가 없고 슬롯으로 처리되는 것도 아무것도 없음....
        -->
    </template>
    <template v-else-if="type ==='month'">
      <v-menu 
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field 
              class="datetimepicker"
              dense
              outlined
              v-model="s_date"
              readonly
              hide-details
              v-bind="attrs" 
              v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="s_date" type="month" no-title scrollable :max="e_date" locale="ko-KR">
            <v-btn text color="primary" @click="reset_date">현재시간</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="date_search(s_date)">선택</v-btn>
            <v-btn text outlined color="primary" @click="menu1 = false">취소</v-btn>
          </v-date-picker>
        </v-menu>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props:['type'],
  data() {
    return {
      menu1: false,
      s_date: moment().format('YYYY-MM'),
      e_date: moment().format('YYYY-MM'),
      // s_date: new Date().toISOString().substr(0, 7),
      // e_date: new Date().toISOString().substr(0, 7),
      date_time: moment().format('YYYY-MM-DD HH:mm:59'),
    }
  },
  computed: {

  },
  methods: {
    reset_date() {
      this.s_date = moment().format('YYYY-MM');
    },
    date_search(v) {
      console.log(v);
      this.s_date = v;
      this.menu1 = false;
      this.$emit('set-date', v);
    }
  }

}
</script>

<style>
.datetimepicker {
  border: 1px solid rgba(0,0,0,.2);
  height: 36px;
  min-height: 36px;
  font-size: 12px;
}
</style>