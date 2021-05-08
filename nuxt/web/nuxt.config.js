/**
 * 한글 어느정도 지원되는 버전 documnet사이트
 * https://v2.vuetifyjs.com/ko/getting-started/quick-start/
 */
import path from 'path'
const { es } = require(path.resolve('apiConfig')).default;
const { logger } = require(path.resolve('logger')).default;
logger.init();

let title = "NuxtJS_Web";
module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'NuxtJS_Web',
    title: `${title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loadingIndicator: {
    name: 'chasing-dots',
    color: 'purple',
    background: 'green'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/bootstrap/css/bootstrap.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/vuetify.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  serverMiddleware: [
    '@/api/index.js'
  ],
  router: {
    middleware: [
      'auth',
      // 'guard'
    ] 
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', //$axios를 사용할 수 있음
    '@nuxtjs/proxy', //axios를 proxy 모듈과 쉽게 통합할 수 있게해준다.
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],
  axios: {
    proxy: false,
    // baseURL: 'https://192.168.3.21:8200'
  },
  // proxy: { 웹에서 다이렉트로 다른 url주소로 요청 보내는거 아니면 사실상 필요없음
  //   '/api/v1': {
  //     target: es.proxyHost
  //   },
  // },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/cmn/loading.vue',
  loadingIndicator: {
    name: 'cube-grid',
    color: '#3B8070',
    background: 'white'
  },
  /*
  ** Build configuration
  */
  ssr: false,
  build: {
    // ssr: false, //SSR앱을 빌드한다.
    /**
    * Run ESLint on save
    * 저장할 때마다 자동으로 ESLint가 실행하려고 할 때 사용한다. 
    * ESLint는 플러그령 린팅 유틸리티로, 스타일 및 서식 지정 코드를 확인한다. (.eslintrc.js 파일을 수정해서 기본 린팅을 바꿀 수 있다.)
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}

