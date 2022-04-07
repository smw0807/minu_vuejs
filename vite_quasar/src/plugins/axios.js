import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type":"application/json",
  },
  timeout: 3000
})

instance.interceptors.request.use(
  (config) => {
    console.log('axios.js request : ' , config);
    //token 체크 로직?
    return config
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
export default instance;