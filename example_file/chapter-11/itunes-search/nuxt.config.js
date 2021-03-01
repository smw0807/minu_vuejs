module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'itunes-search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'iTunes search project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~plugins/vuetify.js'], //루트 Vue.js 인스턴스가 초기화되기 전에 실행된다.
  css: ['~assets/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /**
    * Run ESLint on save
    * 저장할 때마다 자동으로 ESLint가 실행하려고 할 때 사용한다. 
    * ESLint는 플러그령 린팅 유틸리티로, 스타일 및 서식 지정 코드를 확인한다. (.eslintrc.js 파일을 수정해서 기본 린팅을 바꿀 수 있다.)
    */
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    /**
     * vendor 옵션
     * Nuxt.js에서 모듈을 import 할 때마다 웹팩이 생성한 웹 페이지 번들이 코드에 추가된다. (코드 스플릿팅의 일부이다.)
     * 웹팩은 코드를 번들로 분리하고, 요구에 따라 혹은 번들로 불러온다.
     * vendor 옵션을 추가하면 vendor 번들 파일이 딱 한번만 추가된다.
     * 그렇지 않으면 각 임포트가 모든 웹 페이지 번들에 추가되어 프로젝트 크기가 커진다.
     * 항상 모듈을 vendor 옵션에 추가해서 프로젝트에 중복되지 않도록 하는 것이 좋다.
     * (Nuxt 2.0에선 vendor 옵션이 필요하지 않아 삭제해도 된다.)
     */
      // vendor: ['axios', 'vuetify']
  }
}

