import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type":"application/json"
  }
})

const setup = (store) => {
  console.log('axios store : ', store);
  instance.interceptors.request.use(
    (config) => {
      console.log('axios.js request : ' , config);
      //token 체크 로직?
      return config
    }, 
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      console.log('axios.js response : ' , res);
      return res
    },
    (error) => {
      return Promise.reject(error);
    }
  )
}
export default setup;