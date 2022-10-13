// import VueCookies from 'vue-cookies';
export default function ({ $axios }) {
  //request 요청
  $axios.onRequest(config => {
    config.timeout = 10000;
    // console.log('request : ', config);
    return config;
  });

  //에러 처리
  $axios.onResponseError(async error => {
    console.error('Response Error : ', error);
  });
}
