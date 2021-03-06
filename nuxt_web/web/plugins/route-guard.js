//라우터가 변경될 때마다 토큰을 체크하기 위한 미들웨어
import Cookies from 'js-cookie';
export default function ({ app }) {
  app.router.beforeEach( async (to, from, next) => {
    let access = typeof Cookies.get('accessToken') == 'undefined' ? null : Cookies.get('accessToken'); 
    let refresh = typeof Cookies.get('refreshToken') == 'undefined' ? null : Cookies.get('refreshToken');
    if (access === null && refresh !== null) {
      await app.store.dispatch('refreshToken');
    }
    if (access !== null) {
      return next();
    }
    next();
  });
}