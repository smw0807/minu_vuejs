<template>
<div>
  <h1>로그인</h1>
  <div class="form-group">
    <label for="user_id" class="col-sm-2 control-label">아이디</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="user_id" placeholder="ID" v-model="user_id">
    </div>
  </div>
  <div class="form-group">
    <label for="user_pw" class="col-sm-2 control-label">패스워드</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="user_pw" placeholder="Password" v-model="user_pw">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button @click="login" class="btn btn-default">Log in</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
export default {
    data () {
        return {
            user_id: '',
            user_pw: ''
        }
    },
    methods: {
        login () {
            let user_id = this.user_id;
            let user_pw = this.user_pw;
            if (user_id == '') {
                alert('아이디를 입력해주시기 바랍니다.');
                $('#user_id').focus();
                return;
            }
            if (user_pw == '') {
                alert('패스워드를 입력해주시기 바랍니다.');
                $('#user_pw').focus();
                return;
            }
            let params = {
                uid: user_id,
                pass: user_pw
            };
            //a, bbbb
            axios.post(`${this.$store.state.host}/v1/auth/login`, params).then(res => {
              console.log(res);
                if (res.status == 200) {
                  console.log('로그인 성공');
                  this.$store.commit('loginToken', res.data.auth_info);
                  // document.cookie = `accessToken=${res.data.auth_info.accessToken}`;
                  // document.cookie = `refreshToken=${res.data.auth_info.refreshToken}`;
                  VueCookies.set('accessToken', res.data.auth_info.accessToken, '60s' );
                  VueCookies.set('refreshToken', res.data.auth_info.refreshToken, '30m' );
                  axios.defaults.headers.common['x-access-token'] = res.data.auth_info.accessToken;
                  this.$router.push({ name: 'Main', params: {is_login: true} });
                }
            }).catch(err => {
                console.log('error');
                console.log(err);
                alert('로그인 실패');
            });

            // this.$Axios.post(`${this.$store.state.host}/v1/auth/login`, params).then(res => {
            //     if (res.status == 200) {
            //         this.$store.commit('loginToken', res.data.auth_info);
            //         this.$router.push('/');
            //     }
            // })
            // this.$Axios.post()
        }
    }
}
</script>

<style>

</style>