import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
// import auth from './src/plugins/auth'
export default ({ mode }) => {
  /**
   * loadEnv(mode: string, envDir: string, prefixes?: string | string[])
   */
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_SERVER_PROT,
      proxy: {
        // '/api': process.env.VITE_API_URL,
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: 'src/assets/quasar/quasar-variables.sass',
      }),
      // auth() //실행시 최초 1회 실행...
    ],
  });
};
