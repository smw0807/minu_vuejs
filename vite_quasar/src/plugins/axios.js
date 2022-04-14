import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type":"application/json",
  },
  timeout: 3000
})
export default instance;