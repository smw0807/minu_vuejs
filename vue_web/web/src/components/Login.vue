<template>
<div>
  <h1>로그인</h1>
  <div class="form-group">
    <label for="user_id" class="col-sm-2 control-label">아이디</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" placeholder="ID" ref="user_id" v-model="user_id">
    </div>
  </div>
  <div class="form-group">
    <label for="user_pw" class="col-sm-2 control-label">패스워드</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" placeholder="Password" ref="user_pw" v-model="user_pw">
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
  data () { //현재 컴포넌트에서 사용할 데이터셋
    return {
      user_id: '',
      user_pw: ''
    }
  },
  methods: {
    login () {
      let user_id = this.user_id; //input에 v-model은 양방향 데이터 바인딩으로 입력되어 있는 데이터를 바로 받을 수 있음
      let user_pw = this.user_pw;
      
      if (user_id == '') {
          alert('아이디를 입력해주시기 바랍니다.');
          this.$refs.user_id.focus();
          return;
      }
      if (user_pw == '') {
          alert('패스워드를 입력해주시기 바랍니다.');
          this.$refs.user_pw.focus();
          return;
      }
      let params = {
          uid: user_id,
          pass: user_pw
      };
      /**
       * Vuex.Stroe 사용 (중간 저장소)
       * 중간 저장소의 login action을 트리거
       */
      this.$store.dispatch('login', params)
      .then((res) => {
        //로그인 성공 후 이전 페이지로 갈지 메인으로 갈지.
        window.history.length > 2 ? this.$router.go(-1) :  this.$router.push('/')
      })
      .catch(({message}) => (alert(message)));
    },
  }
}
</script>

<style>

</style>