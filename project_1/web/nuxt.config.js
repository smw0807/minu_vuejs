import colors from 'vuetify/es5/util/colors'
/**
 * 링크
 * Vuetify : https://v2.vuetifyjs.com/ko/getting-started/quick-start/
 * https://dev.vuetifyjs.com/en/getting-started/installation/
 * icon : https://materialdesignicons.com/
 */
export default {
  // server: {
  //     // host: '0.0.0.0',
  //     port: '5000'
  //   },
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
    '@nuxtjs/proxy'
  ],

  serverMiddleware: [
    '@/api/index.js'
  ],
  
  // router: {
  //   middleware: [
  //     // 'auth',
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

  axios: {
    proxy: false,
    // baseURL: 'https://192.168.3.21:8200'
  },
  // proxy: {
  //   '/api/v1': {
  //     target: es.proxyHost
  //   },
  // },

  // todo : 공식 홈페이지에 있는 내용이 좀 부족해서 구글링 해봐야 이해할 수 있을 것 같음
  globals: {
    id : globalName => `__${globalName}`
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
    },
    extend(config, ctx) {
      // Include the compiler version of Vue so that wp-content works
      config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"
    }
  }
}
