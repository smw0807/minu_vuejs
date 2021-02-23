import axios from 'axios';
import VueCookies from 'vue-cookies';
import { store } from '../store/store';
// axios.defaults.baseURL = 'http://localhost:3000';

/**
사용자가 한 페이지에 그대로 가만히 있다가 토큰이 만료되었을 때,
이 상태에서 통신 요청을 할 경우 
Refresh Token을 이용해서 Access Token을 갱신 + 통신 요청 그대로 넣어줘야함
그렇게 해야지 사용자는 끊김 없이 바로 원하는 결과를 볼 수 있음
그렇게 하기 위해서는 axios Intercept를 설정해야함
 */

//request 설정
axios.interceptors.request.use(async function (config) { 
  config.url = store.state.host + config.url;
  config.headers['x-access-token'] = VueCookies.get('accessToken');
  config.headers['x-refresh-token'] = VueCookies.get('refreshToken');
  config.headers['Content-Type'] = 'application/json';
    console.log(config);
    return config;
  }, function (error) {
    console.log('axios request error');
    console.log(error);
    return Promise.reject(error);
});
//response 설정
axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  console.log('response error');
  console.log(error);
  // if(error.response.data.status===401 && errorAPI.retry===undefined){
    //       errorAPI.retry = true;
    //       console.log('토큰이 이상한 오류일 경우');
    //       return await axios(errorAPI);
  // }
  return Promise.reject(error);
});

export default axios;