<template>
  <v-row align="start" justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          outlined
        >
          사용자 등록
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">사용자 등록</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user_id" label="아이디*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_nm" label="이름*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_pw" label="비밀번호*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_pw_chk" label="비밀번호 확인*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                v-model="user_auth"
                label="권한"
                :items="authList"
                item-text="name"
                item-value="value"
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_desc" label="설명"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*표시는 반드시 입력해야하는 항목입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save">저장</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      authList: [
        { name: '관리자', value: 'A'},
        { name: '일반 사용자', value: 'M'}
      ],
      user_id: '',
      user_nm: '',
      user_pw: '',
      user_pw_chk: '',
      user_auth: '',
      user_desc: ''
    }
  },
  methods: {
    save() {
      
    }
  }
}
</script>

<style>

</style>