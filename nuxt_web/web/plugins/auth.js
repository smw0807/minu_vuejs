export default  function ({ $cookiz, app, store, req, isDev }) {
  //전역 네비게이션 가드
  app.router.beforeResolve(async function (to, from, next) {
    let token = {
      accessToken: $cookiz.get('accessToken') == undefined ? null : $cookiz.get('accessToken'),
      refreshToken: $cookiz.get('refreshToken') == undefined ? null : $cookiz.get('refreshToken')
    };
    //refreshToken만 있으면 재발급 요청
    if (token.accessToken===null && token.refreshToken!==null) {
      await store.dispatch('refreshToken');
    }
    return next();
  });
}