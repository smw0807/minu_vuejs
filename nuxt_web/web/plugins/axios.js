// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store, redirect  }) {
  let test = 0;
  //request 요청 
  $axios.onRequest(config => {
    // try {
      config.timeout = 10000;
      // console.log('request', config);
      console.log('request!!=====================');
      console.log(config.headers['x-access-token']);
      console.log(config.headers['x-refresh-token']);
      // console.log(config.headers);
      // if (config.headers['x-access-token']===undefined) {
        // console.log('header set accessToken');
        config.headers['x-access-token'] = $cookiz.get('accessToken')===undefined ? null : $cookiz.get('accessToken');
      // }
      // if (config.headers['x-refresh-token']===undefined) {
        // console.log('header set refreshToken');
        config.headers['x-refresh-token'] = $cookiz.get('refreshToken')===undefined ? null : $cookiz.get('refreshToken');
      // }
      console.log('request : ', config.url);
      console.log(test++);
      console.log('=====');
      return config;
    // } catch (error) {
    //   console.log('axios request error : ', error);
    //   return Promise.reject(error);
    // }
  });

  //response
  // $axios.onResponse(function (response) {
  //   try {
  //     return response;
  //   } catch (err) {
  //     console.log('response catch : ', err.message);
  //     return Promise.reject(err.message);
  //   }
  // });

  //에러 처리
  $axios.onError(async function (error) {
    // console.log('onError : ', error.response);
    const errorAPI = error.response.config;
    // if (error.response.status === 401 && errorAPI.retry===undefined && $cookiz.get('refreshToken')!==undefined) { 
    if (error.response.status === 401 && errorAPI.retry===undefined && $cookiz.get('refreshToken')!==undefined) { 
      errorAPI.retry = true; //재요청이라고 추가 정보를 담음 (다시 재요청했는데 이 값이 들어 있으면 재요청을 안함, 이렇게 구분 안하면 request가 에러 날떄마다 무한 재요청 들어감)
      // if ($cookiz.get('accessToken')==undefined && $cookiz.get('refreshToken')!=undefined) {
      // await store.dispatch('refreshToken'); //로그인 중간 저장소에 있는 토큰 재발급 action을 실행 //auth.js랑 중첩 요청으로 에러 발생
      // }
      return await $axios(errorAPI); //다시 axios 요청
    } 
    else if (error.response.status === 401) {
      await store.dispatch('logout');
      redirect('/login');
    } 
    else {
      return false;
    }
  })
};


