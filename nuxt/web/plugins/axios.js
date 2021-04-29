// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store, redirect  }) {
  //request 요청 
  $axios.onRequest(config => {
    // console.log('request : ', config);
    config.timeout = 10000;
    config.headers['x-access-token'] =
      store.$cookiz.get('accessToken') === undefined
        ? null
        : store.$cookiz.get('accessToken');
    console.log('request : ', config.url);
    return config;
  });

  //에러 처리
  $axios.onResponseError(async error => {
    const errorAPI = error.response.config;
    console.log(errorAPI);
    // console.log(`is retry: ${errorAPI.retry}`);
    if (
      401 === error.response.status &&
      !errorAPI.retry &&
      store.$cookiz.get('refreshToken')
    ) {
      errorAPI.retry = true; //재요청이라고 추가 정보를 담음 (다시 재요청했는데 이 값이 들어 있으면 재요청을 안함, 이렇게 구분 안하면 request가 에러 날떄마다 무한 재요청 들어감)
      let res = await store.dispatch('login/refreshToken');
      if (res && res.accessToken && res.refreshToken) {
        console.log('axios refresh token successed!');
        return await $axios(errorAPI); //다시 axios 요청
      } else {
        console.log('axios refresh token failed..');
        await store.dispatch('login/logout');
        return Promise.reject(res);
      }
    } else if (401 === error.response.status) {
      await store.dispatch('login/logout');
      redirect('/login');
      return Promise.reject(error.response);
    } else {
      console.log('axios', error.response);
      return Promise.reject(error.response);
    }
  });

  // //에러 처리
  // $axios.onError(async function (error) {
  //   console.log('onError : ', error.response);
  // })
};


