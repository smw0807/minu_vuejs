module.exports = {
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
    '~assets/bootstrap/css/bootstrap.css'
  ],
  plugins: [
    '~/plugins/axios.js', //인터셉터 처리를 위해 등록
    '~plugins/auth.js' //토큰 체크
  ],
  modules: [
    '@nuxtjs/axios', //$axios를 사용할 수 있음
    '@nuxtjs/proxy', //axios를 proxy 모듈과 쉽게 통합할 수 있게해준다.
    ['cookie-universal-nuxt', {alias: 'cookiz'} ]
  ],
  axios: {
    proxy: true, //proxy 사용
    baseURL: 'http://192.168.1.29:3000'
  },
  proxy: {
    '/v1/': { //axios 요청에 /v1/이 url을 설정
      target: 'http://192.168.1.29:3000'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

