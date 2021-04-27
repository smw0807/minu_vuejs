const  { salt_sha256 }  = require('~/utils/utils').default;

export const state = () => {
  return {
    accessToken: null,
    refreshToken: null
  }
}

export const mutations = {
  SET_TOKEN(state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  }
}

export const getters = {
  GET_TOKEN(state) {
    return state
  }
}

export const actions = {
  login({commit}, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/es/login/login', params);
        console.log('store/login', rs);
        if (!rs.data.result.error) {
          const token = rs.data.result.auth_info;
          console.log(token);
          // console.log(this.$auth.user);
          console.log(this.$auth);
          // const test = await this.$auth.loginWith('local', {
          //   data: rs.data.result.user
          // })
          await this.$auth.strategy.token.set();
          // await this.$auth.strategy.refreshToken.set(token.refreshToken);
          // await this.$auth.cookie.refresh_token.set(token.refreshToken);
          // await this.$auth.strategy.access_token.set(token.accessToken);
          // await this.$auth.strategy.refresh_token.set(token.refreshToken);
          // console.log(this.$auth);
        }
        // const idCheck = await this.$axios.post(`/api/es/login/login/${params.user_id}`);
        // console.log(idCheck);
        // if (idCheck.data.result.msg.hits.hits.length == 0) {
        //   rs.result = false;
        //   rs.msg = '존재하지 않는 아이디 입니다.';
        // } else {
        //   const data = idCheck.data.result.msg.hits.hits[0];
        //   const check = salt_sha256(params.user_pw, data._source.user.user_mk_dt);
        //   if (check != data._source.user.user_pw) {
        //     rs.result = false;
        //     rs.msg = '패스워드가 일치하지 않습니다.';
        //   } else {
        //     console.log('ok');
        //     const login = await this.$axios.post('/api/es/login/login', data);
        //     console.log('login : ', login);
        //     rs.result = true;
        //     rs.msg = 'ok';
        //   }
        // }
        resolve(rs.data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  },
  refreshToken({commit}, params) {

  }
}