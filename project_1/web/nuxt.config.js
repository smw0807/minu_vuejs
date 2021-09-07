import colors from 'vuetify/es5/util/colors'
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
      port: '5000',
    },
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/filters.js',
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
    ['@/modules/example', {name: process.env.name || 'song'}],
  ],

  publicRuntimeConfig: {
    mode: process.env.mode,
  },
  // privateRuntimeConfig: { //이건 ssr : false에서는 안먹히는 것 같음
  //   pr_mode: process.env.mode,
  //   pr_es: process.env.ES_HOST,
  // },
  
  axios: {
    proxy: process.env.proxy === 'Y' ? true : false || false,
    // proxy: false,
    // baseURL: process.env.proxyHost
  },
  proxy: {
    '/api/v1/': {
      target: process.env.proxyHost
    },
  },

  serverMiddleware: [
    '@/api/index.js'
  ],
  
  // router: {
  //   middleware: [
  //     'readConfig',
  //   ] 
  // },

  loading: '~/components/loading.vue',

  // todo 잘 안됨. 좀더 제대로 알아봐야할 것 같음
  // pageTransition: {
  //   name: 'page',
  //   mode: 'slide-right',
  //   beforeEnter (el) {
  //     console.log('Before enter...');
  //   }
  // },

  // cli 속성? https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-cli
  cli: {
    badgeMessages: [ 
      '1.aaaaaaaaaaaaaaaaaaaaaaaaaaa',
      '2.bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    ],
    bannerColor: 'cyanBright'
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
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
