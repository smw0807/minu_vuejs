// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store, redirect  }) {
  //request 요청 
  $axios.onRequest(config => {
    config.timeout = 10000;
    return config;
  });

  //에러 처리
  $axios.onResponseError(async error => {
    console.error('axios Response Error : ' , error);
  });

  // //에러 처리
  // $axios.onError(async function (error) {
  //   console.log('onError : ', error.response);
  // })
};


