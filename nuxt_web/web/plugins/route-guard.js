//라이터가 변경될 때마다 토큰을 체크하기 위한 미들웨어
console.log('route-guard');
import VueCookies from 'vue-cookies';
export default function ({ app }) {
  console.log("????????");
  // console.log(app.router);
  app.router.beforeEach((to, from, next) => {
    console.log('!!!!');
    console.log(VueCookies.get('accessToken'));
    console.log(VueCookies.get('refreshToken'));
    // if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') === null) {
    //   //2개 토큰이 모두 없을 경우 로그인페이지로
    //   return next({ path: 'login' });
    // }
    next();
  });
}