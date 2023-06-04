import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    pages({
      // dirs: 'src/views'
    }),
    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
  ],
});
