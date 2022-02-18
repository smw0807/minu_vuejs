import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default ({mode}) => {
  /**
   * loadEnv(mode: string, envDir: string, prefixes?: string | string[])
   */
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  //import.meta.env.
  return defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/assets/quasar/quasar-variables.sass'
      })
    ]
  })
}
