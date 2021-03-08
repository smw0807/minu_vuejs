// import VueCookies from 'vue-cookies';
export default function ({$cookiz, $axios, store,  req }, inject) {
  //request 요청 
  $axios.onRequest(config => {
    try {
      config.timeout = 10000;
      config.headers['x-access-token'] = $cookiz.get('accessToken')==undefined ? null : $cookiz.get('accessToken');
      config.headers['x-refresh-token'] = $cookiz.get('refreshToken')==undefined ? null : $cookiz.get('refreshToken');
      return config;
    } catch (error) {
      console.log('axios request error : ', error);
      return Promise.reject(error);
    }
  });

  //response
  $axios.onResponse(function (response) {
    try {
      return response;
    } catch (err) {
      console.log('response catch : ', err.message);
      return Promise.reject(err.message);
    }
  });

  //에러 처리
  $axios.onError(async function (error) {
    const errorAPI = error.response.config;
    if (error.response.status === 401 && errorAPI.retry===undefined && $cookiz.get('refreshToken')!==undefined) { 
      errorAPI.retry = true; //재요청이라고 추가 정보를 담음
      // let token = await store.dispatch('refreshToken'); //로그인 중간 저장소에 있는 토큰 재발급 action을 실행 //auth.js랑 중첩 요청으로 에러 발생
      return await $axios(errorAPI); //다시 axios 요청
    } else {
      return false;
    }
  })
};


