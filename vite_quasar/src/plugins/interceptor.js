import instance from "./axios"
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();

const setup = (store) => {
  instance.interceptors.request.use(
    async (config) => {
      console.log('axios.js request : ' , config);
      //token 체크 로직?
      if(import.meta.env.VITE_IS_LOGIN === 'Y') {
        // if (cookies.get('accessToken') === null) {
        //   await store.dispatch('auth/refresh')
        // }
        config.headers['x-access-token'] = cookies.get('accessToken');
        config.headers['x-refresh-token'] = cookies.get('refreshToken');
        return config;
      } else {
        return config
      }
    }, 
    (error) => {
      console.error('axios.js request error : ', error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      console.log('axios.js response : ' , res);
      return res
    },
    (error) => {
      console.error('axios.js reqponse error : ', error);
      if(import.meta.env.VITE_IS_LOGIN === 'Y') {
        const errorAPI = error.response.config;
        console.log('errorAPI : ', errorAPI);
        // if (cookies.get('refreshToken') === null) {
        //   console.error('요청 중 refreshToken 토큰 없음');
        //   store.commit('auth/needLogin', true);
        //   return false;
        // }
        // if (cookies.get('accessToken') === null) {
        //   console.log('요청 중 accessToken 없음');
        //   await store.dispatch('auth/refreshToken');
        //   return config
        // }
      }
      return Promise.reject(error);
    }
  )
}
export default setup;