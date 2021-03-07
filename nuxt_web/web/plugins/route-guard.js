//라우터가 변경될 때마다 토큰을 체크하기 위한 미들웨어
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
export default function ({ app, store, req,  }) {
  console.log('route-guard');
  app.router.beforeEach( async (to, from, next) => {
    let access = null;
    let refresh = null;
    if (process.client) {
      console.log('client');
      access = Cookies.getJSON('accessToken');
      refresh = Cookies.getJSON('refreshToken');
    }
    if (process.server) {
      console.log('server');
      access = cookie.parse(req.headers.cookie)['accessToken'];
      refresh = cookie.parse(req.headers.cookie)['refreshToken'];
    }
    console.log(access);
    console.log(refresh);
    
    // let access = typeof Cookies.get('accessToken') == 'undefined' ? null : Cookies.get('accessToken'); 
    // let refresh = typeof Cookies.get('refreshToken') == 'undefined' ? null : Cookies.get('refreshToken');
    // console.log('---------- route-guard ---------');
    // console.log(access);
    // console.log(refresh);
    // console.log('---------------------------------');
    if (access === undefined && refresh !== undefined) {
      console.log('refresh!');
      await app.store.dispatch('refreshToken');
    }
    if (access !== undefined) {
      return next();
    }
    next();
  });
}