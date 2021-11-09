// import VueCookies from 'vue-cookies';
export default function ({$axios}) {
  //request 요청 
  $axios.onRequest(config => {
    config.timeout = 10000;
    if (config.type && config.type === 'file') {
      config.headers['Content-Type'] = 'multipart/form-data'
      console.log(config.headers);
    }
    console.log('request : ', config);
    return config;
  });

  //에러 처리
  $axios.onResponseError(async error => {
   console.error('Response Error : ' ,error)
  });
};


