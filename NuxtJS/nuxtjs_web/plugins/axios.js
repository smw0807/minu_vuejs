// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store, redirect  }) {
  //request 요청 
  $axios.onRequest(config => {
    console.log('request : ', config);
    return config;
  });


  //에러 처리
  $axios.onError(async function (error) {
    // console.log('onError : ', error.response);
  })
};


