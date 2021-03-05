import VueCookies from 'vue-cookies';
export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  inject('api', api)

  //request 요청 
  $axios.onRequest(config => {
    console.log('request', config);
    config.timeout = 10000;
    config.headers['x-access-token'] = VueCookies.get('accessToken');
    config.headers['x-refresh-token'] = VueCookies.get('refreshToken');
    return config;
  }, function (error) {
    console.log('axios request error : ', error);
    return Promise.reject(error);
  });

  //response
  $axios.onResponse(function (response) {
    console.log('response', response);
    try {
      return response;
    } catch (err) {
      console.error('[axios.interceptors.response] response : ', err.message);
    }
  }, async function (error) {
    try {
      if (error.response.status == 401 && errorAPI.retry==undefined && VueCookies.get('refreshToken')!=null)  { 
        errorAPI.retry = true; //재요청이라고 추가 정보를 담음
        await this.$store.dispatch('modules/login/refreshToken'); //로그인 중간 저장소에 있는 토큰 재발급 action을 실행
        return await axios(errorAPI); //다시 axios 요청
      }
    } catch (error) {
      console.error('[axios.interceptors.response] error : ', error.message);
    } 
    return Promise.reject(error);
  });
}

