import instance from "./axios"
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();

const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      console.log('axios.js request : ' , config);
      //token 체크 로직?
      if(import.meta.env.VITE_IS_LOGIN === 'Y') {
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
      return Promise.reject(error);
    }
  )
}
export default setup;