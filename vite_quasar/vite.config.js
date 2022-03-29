import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default ({mode}) => {
  /**
   * loadEnv(mode: string, envDir: string, prefixes?: string | string[])
   */
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    base: '/',
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_SERVER_PROT,
      proxy: {
        '/api': process.env.VITE_API_URL,
      }
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/assets/quasar/quasar-variables.sass'
      })
    ],
  })
}
