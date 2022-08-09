import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true, //true로 하면 설정 포트가 이미 다른 곳에서 사용중일 때 다음 포트로 시도하지 않음
  },
  plugins: [vue()],
})
