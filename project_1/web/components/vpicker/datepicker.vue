<template>
  <v-card>
    <v-card-title>
    v-date-picker and min, max        
    </v-card-title>
    <v-card-text>
       <v-row>
        <v-col cols="12" lg="2">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="s_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="s_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="s_date" no-title scrollable :max="e_date" locale="KR">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">취소</v-btn>
              <v-btn text color="primary" @click="s_date_search(s_date)">확인</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        
        <v-col cols="12" lg="2">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="e_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="e_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="e_date" no-title scrollable :min="s_date" :max="date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="e_date_search(e_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * 2021-07-11 고민
 * locale="ko-KR"을 넣으면 일자마다 '일'이라는 한글이 생기는데 없애는 방법은?
 * ko-KR 말고도 ko, KR 이렇게만 넣어도 한글로 되긴함
 */
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
  },
  methods: {
    s_date_search(v) {
      this.s_date = v;
      this.menu1 = false;
      this.$refs.menu1.save(v);
    },
    e_date_search(v) {
      this.e_date = v;
      this.menu2 = false;
      this.$refs.menu2.save(v);
    }
  },
}
//=======================================================

</script>

<style>

</style>
