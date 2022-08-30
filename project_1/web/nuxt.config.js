import colors from 'vuetify/es5/util/colors';
import { server } from './serverMiddleware';
/**
 * 링크
 * Vuetify : https://v2.vuetifyjs.com/ko/getting-started/quick-start/
 * https://dev.vuetifyjs.com/en/getting-started/installation/
 * icon : https://materialdesignicons.com/
 */
export default {
  // development, production
  // dev: 'production',
  server: {
    //     // host: '0.0.0.0',
    port: '3000',
  },
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/filters.js',
    '@/plugins/directive.js',
    '@/plugins/VueCtkDateTimePicker.js',
    '@/plugins/vue-json-csv.js',
    '@/plugins/log.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    // '@/modules/example',
    ['@/modules/example', { name: process.env.name || 'song' }],
    'nuxt-socket-io',
    '@/modules/storeList',
  ],
  io: {
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:8005',
        default: true,
      },
    ],
  },

  publicRuntimeConfig: {
    mode: process.env.mode,
  },
  // privateRuntimeConfig: { //이건 ssr : false에서는 안먹히는 것 같음
  //   pr_mode: process.env.mode,
  //   pr_es: process.env.ES_HOST,
  // },

  /**
   * serverMiddleware 값이 null이 아니면
   * axios옵션이 잇건 말건 내부 API url을 우선으로 찾음 (내 소스상에서 내부에 /api/와 외부에 /api/를 두고 테스트 해봤음)
   * 없으면 외부로 요청 나감 (내 소스상에서 /express는 외부에만 만들었음)
   * null이면 내부에 api를 만들어도 어차피 안타고 외부로 요청이 나감 (내 소스상에서 /api/, /express/ 둘다)
   * 사실상 axios 옵션은 적용이 안되는 듯...? 값을 바꿔서 해보고 다 주석처리 해봐도 위 내용 그대로 진행이댔음.
   */
  axios: {
    proxy: process.env.proxy === 'Y' ? true : false || false,
    // baseURL: process.env.proxyHost
  },
  proxy: {
    '/api/': process.env.proxyHost,
    // '/express/': process.env.proxyHost
  },

  /**
   * proxy가 있어도 serverMiddleware: [ '@/api/index.js' ] 이런식으로 있으면
   * proxy 값을 무시하고 저 파일을 우선시 읽는 것 같음..
   * null로 주면 proxy값으로 감
   */
  serverMiddleware: server(),

  /**
   * 라우터 미들웨어
   * 라우터 이동시마다 저장된 파일이 실행됨
   */
  router: {
    middleware: ['router'],
  },

  loading: '~/components/loading.vue',

  // cli 속성? https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-cli
  cli: {
    badgeMessages: [
      '1.aaaaaaaaaaaaaaaaaaaaaaaaaaa',
      '2.bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    ],
    bannerColor: 'cyanBright',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
};
