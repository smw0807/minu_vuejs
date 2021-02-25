import vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { store } from '../store/store';
import { login, refresh } from '../service/login';
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
  console.log('request : ', config);
  return config;
}, function (error) {
  console.log('axios request error');
  console.log(error.config)
  return Promise.reject(error);
});
//response 설정
// axios.interceptors.response.use(
//   function (response) {
//     try {
//       console.log('response : ', response);
//       return response;
//     } catch (err) {
//       console.error('[axios.interceptors.response] response : ', err.message);
//     }
//   },
//   function (error) {
//     try {
//       console.log('response error : ' , error.config);
//     } catch (err) {
//       console.err('[axios.interceptors.response] error : ', err.message);
//     }
//     return Promise.reject(error);
// });
axios.interceptors.response.use(
  function (response) {
    try {
      console.log('response : ', response);
      return response;
    } catch (err) {
      console.error('[axios.interceptors.response] response : ', err.message);
    }
  },
  function (error) {
    try {
      console.log('response error : ' , error);
      console.log(error.response);
      console.log(error.response.status);
      if (error.response.status == 401) {
        console.log("????");
        // console.log(store.getters.);
        return refresh(rt => {
            console.log(rt);
            error.config.header['x-access-token'] = VueCookies.get('accessToken');
            return axios.request(error.config);
        })
      }
    } catch (err) {
      console.error('[axios.interceptors.response] error : ', err.message);
    }
    return Promise.reject(error);
})

export default axios;