import colors from 'vuetify/es5/util/colors';
import aRoot from 'app-root-path';
import fs from 'fs';

export default {
  server: {
    host: process.env.server_host,
    port: process.env.server_port,
    https: {
      key: fs.readFileSync(aRoot + '/_ssl/server.key'),
      cert: fs.readFileSync(aRoot + '/_ssl/server.crt')
    }
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AF_Manager',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/logo_main.png' },
      // { rel: 'icon', type: 'image/x-icon', href: '/img/cloud-network-16.png' },
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/lib/slick/slick.css' },
      { rel: 'stylesheet', href: '/css/main_dark.css' }
    ],
    script: [
      { type: 'text/javascript', src: '/lib/jquery.js' },
      { type: 'text/javascript', src: '/lib/jquery-ui.js' },
      { type: 'text/javascript', src: '/lib/jquery.event.drag-2.3.0.js' },
      { type: 'text/javascript', src: '/lib/slick/slick.core.js' },
      { type: 'text/javascript', src: '/lib/slick/slick.dataview.js' },
      { type: 'text/javascript', src: '/lib/slick/slick.grid.js' },
      { type: 'text/javascript', src: '/lib/slick/plugins/slick.checkboxselectcolumn.js' },
      { type: 'text/javascript', src: '/lib/slick/plugins/slick.columnpicker.js' },
      { type: 'text/javascript', src: '/lib/slick/plugins/slick.rowmovemanager.js' },
      { type: 'text/javascript', src: '/lib/slick/plugins/slick.rowselectionmodel.js' },
      { type: 'text/javascript', src: '/lib/slick/plugins/slick.cellexternalcopy.js' },
      { type: 'text/javascript', src: '/lib/slick/slick.formatters.js' },
      { type: 'text/javascript', src: '/lib/slick/slick.editors.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/node_modules/animate.css/animate.compat.css', '@/assets/fonts/font.css', '@/assets/css/main.css', '@mdi/font/css/materialdesignicons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js', //인터셉터 처리를 위해 등록
    '@/plugins/context-menu',
    '@/plugins/directive',
    '@/plugins/filters',
    '@/plugins/index-db',
    '@/plugins/nuxt-client-init',
    '@/plugins/socket-worker',
    '@/plugins/vue-ctk-date-time-picker',
    '@/plugins/vue-echarts-config',
    '@/plugins/vue-grid-layout',
    '@/plugins/vue-json-editor',
    '@/plugins/vue-json-pretty',
    '@/plugins/vue-number-animation',
    '@/plugins/vue-tree-list',
    '@/plugins/vuejs-ace-editor',
    '@/plugins/vuex-persistedstate'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components/cmn' }, { path: '~/components/widget', prefix: 'widget' }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    //서버 환경변수 설정 .env에 있는 필드를 process.env 환경변수에 자동 주입
    //server side (private)에는 모든 env필드가 주입되지만 client side (public)에는 only에 지정한 필드만 주입됨 (보안)
    ['@nuxtjs/dotenv', { only: [] }],
    'nuxt-compress'
  ],

  axios: {
    proxy: false
  },

  //.env 환경변수 읽어와서 config값 설정
  //vue에서 this.$config 로 불러옴 ex) this.$config.mode
  publicRuntimeConfig: {
    mode: process.env.mode,
    axios: {
      baseURL: process.env.baseURL
    },
    socket_token: process.env.socket_token,
    licenseKey: process.env.licenseKey,
    cmn: {
      snort: process.env['cmn.snort'],
      yara: process.env['cmn.yara']
    }
  },

  privateRuntimeConfig: {},

  serverMiddleware: ['@/api/index.js'],
  router: {
    middleware: ['auth-interceptor']
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy', ['cookie-universal-nuxt', { alias: 'cookiz' }]],

  // proxy: {
  //   '/api/v1': {
  //     target: 'https://192.168.3.21:8200'
  //   }

  // },

  loading: '~/components/loading.vue',
  loadingIndicator: {
    name: 'three-bounce',
    color: 'white',
    background: '#1e1e1e'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    // defaultAssets: {
    //   font: {
    //     family: 'NotoSansKR'
    //   }
    // },
    customVariables: ['~/assets/variables.scss']
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    },
    transpile: ['vue-echarts', 'resize-detector'],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          loader: 'worker-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
