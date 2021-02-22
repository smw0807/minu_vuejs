import axios from 'axios';
import VueCookies from 'vue-cookies';
import { refreshToken } from '../service/login'

// axios.defaults.baseURL = 'http://localhost:3000';

/**
사용자가 한 페이지에 그대로 가만히 있다가 토큰이 만료되었을 때,
이 상태에서 통신 요청을 할 경우 
Refresh Token을 이용해서 Access Token을 갱신 + 통신 요청 그대로 넣어줘야함
그렇게 해야지 사용자는 끊김 없이 바로 원하는 결과를 볼 수 있음
그렇게 하기 위해서는 axios Intercept를 설정해야함
 */

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers.accessToken = VueCookies.get('accessToken');
    config.headers.refreshToken = VueCookies.get('refreshToken');
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('에러일 경우', error.config);
    const errorAPI = error.config;
    if(error.response.data.status===401 && errorAPI.retry===undefined){
      errorAPI.retry = true;
      console.log('토큰이 이상한 오류일 경우');
      await refreshToken();
      return await axios(errorAPI);
    }
    return Promise.reject(error);
  });


export default axios;