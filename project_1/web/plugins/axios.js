// import VueCookies from 'vue-cookies';
export default function ({$axios}) {
  console.log('plugin!!!!!2');
  //request 요청 
  $axios.onRequest(config => {
    // console.log('request : ', config);
    config.timeout = 10000;
    return config;
  });

  //에러 처리
  $axios.onResponseError(async error => {
   console.error('Response Error : ' ,error)
  });
};


