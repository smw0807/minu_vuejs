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
      this.$store.dispatch('login', params)
      .then((res) => {
        console.log("login!!", res);
        window.history.length > 2 ? this.$router.go(-1) :  this.$router.push('/')
      })
      .catch(({message}) => (alert(message)));
    },
  }
}
</script>

<style>

</style>