module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxtjs_jwt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'NuxtJS + Vuex + JWT' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~assets/bootstrap/css/bootstrap.css' //css 파일 추가
  ],
  plugins: [
    '~/plugins/axios.js', //인터셉터 처리를 위해 등록
    '~/plugins/auth.js' //토큰 체크
  ],
  // router: {
  //   middleware: [
  //     'route-guard'
  //   ]
  // },
  modules: [
    '@nuxtjs/axios', //$axios를 사용할 수 있음
    '@nuxtjs/proxy', //axios를 proxy 모듈과 쉽게 통합할 수 있게해준다.
    ['cookie-universal-nuxt', {alias: 'cookiz'} ]
  ],
  axios: {
    proxy: false, // true면 proxy 사용해서 해당되는 요청은 target url을 사용함
    baseURL: 'http://localhost:3000'
  },
  proxy: {
    // '/v1/': { //axios 요청에 /v1/이 url을 설정
    //   target: 'http://192.168.1.29:3000'
    // }
  },
  serverMiddleware: [
    // <project root>/api/index.js 모듈을 미들웨어로 추가
    '~/api/index.js',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    ssr: false, // true: Server-Side Rendering , false : Client-Side Rendering
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      }
    }
  }
}

