<template>
<!-- 작업자:임지연 -->  
<v-row align="start" justify="end">
  <div>
  <v-dialog v-model="dialog" persistent max-width="450px">

    <template v-slot:activator="{ on, attrs }">
      <v-btn
        raised
        color="primary"
        v-bind="attrs"
        v-on="on"
        style="padding: 19px">
        <v-icon style=" transform: translateY(1px);">mdi-account-plus</v-icon>
        &nbsp;사용자 등록
      </v-btn>
    </template>

    <v-card raised outlined class="pa-3 user_popup" :loading="loading" > 
      <v-card-title style=" padding-bottom: 0; ">
        <div class="headline" 
          style="margin: 0 auto; width: 200px; text-align:center; font-weight:600; padding-top:10px;">
          <v-icon style="font-size:30px; transform: translateY(-1px);">mdi-account-plus</v-icon>
          사용자 등록
        </div>
      </v-card-title>
      <!-- <hr/> -->
      <v-card-text style="padding:0 30px 15px; transform:translateY(10px)">
          <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="user_id"
                  label="아이디*" 
                  :counter="15" 
                  :rules="user_id_rule" 
                  :disabled="state == 'ins' ? false : true" 
                  autofocus
                  required
                  >
                </v-text-field>
                <!-- <v-text-field :value="user_id" @change="v => user_id = v" label="아이디*" :rules="user_id_rule" :disabled="state == 'ins' ? false : true" required></v-text-field> -->
                <v-text-field 
                  v-model="user_nm" 
                  label="이름*"
                  :counter="30" 
                  :rules="user_nm_rule" 
                  required></v-text-field>
                <v-text-field 
                  v-model="user_pw" 
                  label="비밀번호*" 
                  :counter="30" 
                  type="password" 
                  :rules="user_pw_rule"></v-text-field>
                <v-text-field 
                  v-model="user_pw_chk" 
                  label="비밀번호 확인*" 
                  :counter="30" 
                  type="password" 
                  :rules="user_pw_rule2"></v-text-field>
                <v-select
                  v-model="user_auth"
                  label="권한*"
                  :items="authList"
                  item-text="name"
                  item-value="value"
                  return-object
                  :rules="user_auth_rule"
                  ></v-select>
                <v-text-field 
                  v-model="user_desc" 
                  label="설명" 
                  :counter="100" 
                  :rules="user_desc_rule">
                </v-text-field>
              <v-switch
                v-model="is_use"
                :label="is_use == true? '사용함' : '사용안함'"></v-switch>
          </v-form>
        <small class="red--text">*표시는 반드시 입력해야하는 항목입니다.</small>
      </v-card-text>
      <v-card-actions style="justify-content: center; padding-bottom: 15px; ">
        <!-- <v-spacer></v-spacer> -->
        <v-btn class="ma-2" raised depressed color="primary" @click="save">
          <v-icon left>mdi-check</v-icon> 저장
        </v-btn>
        <v-btn class="ma-2" raised depressed @click="close">
          <v-icon left>mdi-close</v-icon> 닫기
        </v-btn>

      </v-card-actions>
    </v-card>

  </v-dialog>
  </div>
  </v-row>
</template>
<script>
export default {
  props: [ 'user_info' ],
  data() {
    return {
      dialog: false,
      state: 'ins',

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
      authList: [
        { name: '관리자', value: 'A'},
        { name: '일반 사용자', value: 'M'}
      ],
      user_auth: '',
      user_auth_rule: [
        v => !!v || '권한은 필수 선택 사항입니다.'
      ],
      user_desc: '',
      user_desc_rule: [
        v => !(v && v.length >= 100) || '설명은 100자 이상 입력할 수 없습니다.'
      ],
      is_use : true,
    }
  },
  watch: {
    user_info() { 
      console.log(this.user_info);
      if(this.user_info != null){
        const user = this.user_info;
        this.state = 'upd';
        this.user_id = user.user_id;
        this.user_nm = user.user_nm;
        this.user_auth = user.user_auth_code;
        this.user_desc = user.user_desc;
        this.is_use = user.is_use;
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
      console.log("/// : ", this.$confirm);
      const validate = this.$refs.form.validate();
      if (validate) {
        if (confirm ('저장하시겠습니까?')) {
          const params = {
            user_id: this.user_id,
            user_nm: this.user_nm,
            user_pw: this.user_pw,
            user_auth_code: this.user_auth.value,
            user_auth_nm: this.user_auth.name,
            user_desc: this.user_desc,
            is_use: this.is_use,
          }
          if (this.state == 'upd') {
            params._id = this.user_info._id;
            params.user_mk_dt = this.user_info.user_mk_dt;
  
          }
          try {
            this.$nuxt.$loading.start();
            const url = (this.state == 'ins' ? 'equipment/user/insertUser' : 'equipment/user/updateUser');
            const rs = await this.$store.dispatch(url, params);
            if (rs.data.result.error == false) {
              (this.state=='ins') ? alert('저장되었습니다') : alert('수정되었습니다');
              this.$nuxt.$loading.finish();
              this.$store.dispatch('equipment/user/initUserList');
              this.close();
            }else{
              if(rs.data.result.msg == 'existed'){
                alert('이미 사용중인 ID입니다. 다른 ID를 입력해주세요.');
              }else{
                alert('저장에 실패했습니다. 잠시 후에 다시 시도해주세요.');
              }
              this.$nuxt.$loading.finish();
            }
          } catch (err) {
            console.error(err);
            this.$nuxt.$loading.finish();
          }
        }
      }
    },
    //id 중복체크
     checkDuplicate(user_id) {     
      const user_data = this.$store.getters['equipment/user/GET_USER_LIST'];
      let user_idcheck;
      for(let i in user_data) {
        user_idcheck = user_data[i].user_id;
        if(user_id == user_idcheck){
          return '이미 사용중인 ID입니다.';
        }
      }
      return true
    },
    close() {
      this.dialog = false;
      this.state = 'ins';
      this.user_id = '';
      this.user_nm = '';
      this.user_pw = '';
      this.user_pw_chk = '';
      this.user_auth = '';
      this.user_auth_nm = '';
      this.user_desc = '';
      this.is_use = true;
      // this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$emit('set_info', null);
    }
  }
}
</script>
<style>

.user_popup{
  border-radius: 15px !important;
}
.user_popup .v-text-field .v-label{
  font-size:14px;
}
/* .v-list-item__content{
  font-family:'Noto Sans KR', sans-serif;
} */
.user_popup .v-list-item__title{
  font-size:14px;
}
</style>