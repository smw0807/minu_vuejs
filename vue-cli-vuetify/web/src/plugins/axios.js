import axios from 'axios'
console.log('axios', process.env.VUE_APP_API_URL1);
console.log('axios', process.env.VUE_APP_API_URL2);

//요청
axios.interceptors.request.use(async (config) => {
  console.log('axios request : ', config);
  return config;
}, (error) => {
  console.error('axsio request error : ', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
  console.log('axios response : ', response);
  return response;
}, (error) => {
  console.log('axios response error : ', error);
  return Promise.reject(error);
})

export default axios;
// const instance = axios.create({
//   baseURL: 'http://localhost:9000',
//   timeout: 10000
// })

// //요청
// instance.interceptors.request.use(async (config) => {
//   console.log('axios request : ', config);
//   return config;
// }, (error) => {
//   console.error('axsio request error : ', error);
//   return Promise.reject(error);
// });

// instance.interceptors.response.use(async (response) => {
//   console.log('axios response : ', response);
//   return response;
// }, (error) => {
//   console.log('axios response error : ', error);
//   return Promise.reject(error);
// })

// export default instance;