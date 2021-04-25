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
        let rs = {};
        const idCheck = await this.$axios.post(`/api/es/login/login/${params.user_id}`);
        console.log(idCheck);
        if (idCheck.data.result.msg.hits.hits.length == 0) {
          rs.result = false;
          rs.msg = '존재하지 않는 아이디 입니다.';
        } else {
          const data = idCheck.data.result.msg.hits.hits[0];
          const check = salt_sha256(params.user_pw, data._source.user.user_mk_dt);
          if (check != data._source.user.user_pw) {
            rs.result = false;
            rs.msg = '패스워드가 일치하지 않습니다.';
          } else {
            console.log('ok');
            const login = await this.$axios.post('/api/es/login/login', {user_id: params.user_id});
            console.log(test);
            rs.result = true;
            rs.msg = 'ok';
          }
        }
        resolve(rs);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  },
  refreshToken({commit}, params) {

  }
}