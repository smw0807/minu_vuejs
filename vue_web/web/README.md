# Vue-CLI + JWT 를 이용한 웹 애플리케이션
토큰을 만들어주는 소스는 없음
로그인해서 accessToken과 refreshToken을 받아서 쿠키로 저장하고<br>
이벤트가 발생할 때마다 토큰을 이용해서 유효한 토큰이면 이벤트가 진행됨<br>
토큰 만료시 refreshToken으로 재발급 받음

# basic_web

> login and board

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
