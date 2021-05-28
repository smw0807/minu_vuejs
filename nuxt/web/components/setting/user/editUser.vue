<template>
  <v-row align="start" justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          raised
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          사용자 등록
        </v-btn>
      </template>
      <v-card raised outlined class="pa-3" :loading="loading"> 
        <v-card-title>
          <span class="headline">사용자 등록</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user_id" label="아이디*" :rules="user_id_rule" :disabled="state == 'ins' ? false : true" required></v-text-field>
                <!-- <v-text-field :value="user_id" @change="v => user_id = v" label="아이디*" :rules="user_id_rule" :disabled="state == 'ins' ? false : true" required></v-text-field> -->
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_nm" label="이름*" :rules="user_nm_rule" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_pw" label="비밀번호*" type="password" :rules="user_pw_rule"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_pw_chk" label="비밀번호 확인*" type="password" :rules="user_pw_rule2"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                v-model="user_auth"
                label="권한*"
                :items="authList"
                item-text="name"
                item-value="value"
                return-object
                :rules="user_auth_rule"
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user_desc" label="설명" :rules="user_desc_rule"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <small class="red--text">*표시는 반드시 입력해야하는 항목입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" raised depressed color="primary" @click="save">
            <v-icon left>mdi-check</v-icon> 저장
          </v-btn>
          <v-btn class="ma-2" raised depressed @click="close">
            <v-icon left>mdi-close</v-icon> 닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: [ 'user_info' ],
  data() {
    return {
      dialog: false,
      state: 'ins',
      authList: [
        { name: '관리자', value: 'A'},
        { name: '일반 사용자', value: 'M'}
      ],
      user_id: '',
      user_id_rule: [
        v => !!v || '아이디는 필수 입력사항입니다.',
        v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.',
        v => !( v && v.length >= 15) || '아이디는 15자 이상 입력할 수 없습니다.',
        v => this.state === 'ins' ? this.checkDuplicate(v) : true
      ],
      user_nm: '',
      user_nm_rule: [
        v => !!v || '이름은 필수 입력사항입니다.',
        v => !(v && v.length >= 30) || '이름은 30자 이상 입력할 수 없습니다.',
        v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
      ],
      user_pw: '',
      user_pw_chk: '',
      user_pw_rule: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
      ],
      user_pw_rule2: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
        v => v === this.user_pw || '패스워드가 일치하지 않습니다.'
      ],
      user_auth: '',
      user_auth_rule: [
        v => !!v || '권한은 필수 선택 사항입니다.'
      ],
      user_desc: '',
      user_desc_rule: [
        v => !(v && v.length >= 100) || '설명은 100자 이상 입력할 수 업습니다.'
      ]
    }
  },
  watch: {
    user_info() { 
      //listTable 컴포넌트에서 user_info 데이터를 넘기면 수정화면으로 판단 시키고 text field에 데이터를 넣어줌
      if (user_info !== null) {
        const user = this.user_info;
        this.state = 'upd';
        this.user_id = user.user_id;
        this.user_nm = user.user_nm;
        this.user_auth = user.user_auth_code;
        this.user_desc = user.user_desc;
        this.dialog = true;
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters['GET_LOADING_2'];
    }
  },
  methods: {
    async save() {
      const validate = this.$refs.form.validate();
      if (validate) {
        if (confirm ('저장하시겠습니까?')) {
          const params = {
            user_id: this.user_id,
            user_nm: this.user_nm,
            user_pw: this.user_pw,
            user_auth_code: this.user_auth.value,
            user_auth_nm: this.user_auth.name,
            user_desc: this.user_desc
          }
          if (this.state == 'upd') {
            params._id = this.user_info._id;
            params.user_mk_dt = this.user_info.user_mk_dt;
  
          }
          try {
            this.$nuxt.$loading.start();
            const url = (this.state == 'ins' ? 'setting/user/insertUser' : 'setting/user/updateUser');
            const rs = await this.$store.dispatch(url, params);
            if (rs.data.result.error == false) {
                this.$nuxt.$loading.finish();
                this.$store.dispatch('setting/user/initUserList');
                this.close();
            }
          } catch (err) {
            alert(err);
          }
        }
      }
    },
    //id 중복체크
     checkDuplicate(user_id) {     
      const user_data = this.$store.getters['setting/user/GET_USER_LIST'];
        for(var i in user_data) {
          var user_idcheck = user_data[i].user_id;
        if(user_id == user_idcheck){
          return '이미 사용중인 아이디입니다.';
        }
      }
      return true
    },
    close() {
      this.dialog = false;
      this.state = 'ins';
      this.$refs.form.reset();
      this.$emit('set_info', null);
    }
  }
}
</script>

<style>

</style>
