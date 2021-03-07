// import VueCookies from 'vue-cookies';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
export default function ({ $axios, req }, inject) {
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
    let access = null;
    let refresh = null;
    if (process.client) {
      console.log('client');
      access = Cookies.getJSON('accessToken');
      refresh = Cookies.getJSON('refreshToken');
    }
    if (process.server) {
      console.log('server');
      access = cookie.parse(req.headers.cookie)['accessToken'];
      refresh = cookie.parse(req.headers.cookie)['refreshToken'];
    }
    config.timeout = 10000;
    config.headers['x-access-token'] = access === undefined ? null : access;
    config.headers['x-refresh-token'] = refresh === undefined ? null : refresh;
    // config.headers['x-access-token'] = VueCookies.get('accessToken');
    // config.headers['x-refresh-token'] = VueCookies.get('refreshToken');
    console.log('request', config);
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
      let refresh = null;
      if (process.client) {
        refresh = Cookies.getJSON('refreshToken');
      }
      if (process.server) {
        refresh = cookie.parse(req.headers.cookie)['refreshToken'];
      }
      const errorAPI = error.response.config;
      // console.log('errorAPI : ', errorAPI);
      if (error.response.sta,tus === 401 && errorAPI.retry===undefined && refresh!==undefined)  { 
      // if (error.response.sta,tus == 401 && errorAPI.retry==undefined)  { 
        errorAPI.retry = true; //재요청이라고 추가 정보를 담음
        await this.$store.dispatch('refreshToken'); //로그인 중간 저장소에 있는 토큰 재발급 action을 실행
        return await axios(errorAPI); //다시 axios 요청
      }
    } catch (error) {
      console.error('[axios.interceptors.response] error : ', error.message);
    } 
    return Promise.reject(error);
  });
}

