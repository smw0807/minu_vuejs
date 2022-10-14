import instance from './axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const setup = store => {
  instance.interceptors.request.use(
    async config => {
      console.log('axios.js request : ', config);
      if (import.meta.env.VITE_IS_LOGIN === 'Y') {
        config.headers['x-access-token'] = cookies.get('accessToken');
        config.headers['x-refresh-token'] = cookies.get('refreshToken');
        return config;
      } else {
        return config;
      }
    },
    error => {
      console.error('axios.js request error : ', error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    res => {
      // console.log('axios.js response : ' , res);
      return res;
    },
    async error => {
      console.error('axios.js reqponse error : ', error);
      if (import.meta.env.VITE_IS_LOGIN === 'Y') {
        const errorRes = error.response;
        const errorAPI = error.response.config;
        if (cookies.get('refreshToken') === null) {
          store.commit('auth/needLogin', true);
          return Promise.reject(error);
        } else {
          if (errorRes.status === 419) {
            // accessToken이 null일 경우 419코드를 받고 토큰 재생성 요청
            try {
              await store.dispatch('auth/refreshToken');
              return instance(errorAPI);
            } catch (err) {
              // console.error('err);
              return Promise.reject(err);
            }
          }
          if (errorRes.status === 401) {
            //accessToken이 변조 등 유효하지 않은 토큰일 경우
            console.warn('유효하지   않은 토큰', error);
            store.commit('auth/needLogin', true);
            alert('다시 로그인해주시기 바랍니다.');
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
export default setup;
