// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store,  req }, inject) {
  // const api = $axios.create({
  //   headers: {
  //     common: {
  //       Accept: 'text/plain, */*'
  //     }
  //   }
  // })
  // inject('api', api);

  //request 요청 
  $axios.onRequest(config => {
    console.log('request');
    config.timeout = 10000;
    config.headers['x-access-token'] = $cookiz.get('accessToken')==undefined ? null : $cookiz.get('accessToken');
    config.headers['x-refresh-token'] = $cookiz.get('refreshToken')==undefined ? null : $cookiz.get('refreshToken');
    return config;
  });

  // //response
  // $axios.onResponse(function (response) {
  //   console.log('response');
  //   try {
  //     return response;
  //   } catch (err) {
  //     console.error('[axios.interceptors.response] response : ', err.message);
  //   }
  // }, async function (error) {
  //   try {
  //     console.log('response error!!!');
  //     console.log('response', error.response);
  //     const errorAPI = error.response.config;
  //     console.log(error.response.config);
  //     if (error.response.status === 401 && errorAPI.retry===undefined && $cookiz.get('refreshToken')!==undefined)  { 
  //       errorAPI.retry = true; //재요청이라고 추가 정보를 담음
  //       let refresh = await this.$store.dispatch('refreshToken'); //로그인 중간 저장소에 있는 토큰 재발급 action을 실행
  //       return await axios(errorAPI); //다시 axios 요청
  //     }
  //   } catch (error) {
  //     console.error('[axios.interceptors.response] error : ', error.message);
  //   } 
  //   return Promise.reject(error);
  // });

  $axios.onError(async function (error) {
    // return new Promise(async (resolve, reject) => {
       console.log('onError' , error.response.config);
     // return 
       if (error.response.status === 401 && error.response.config.retry === undefined && $cookiz.get('refreshToken')!== undefined) {
         console.log('onError/retry?');
         let errorAPI = error.response.config;
         errorAPI.retry = true;
         await store.dispatch('refreshToken');
         console.log(errorAPI);
         return await $axios(errorAPI);
      //  } else {
      //    return redirect('/');
       }
    // })
 });
};


