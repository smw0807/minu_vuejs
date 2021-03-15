export default  function ({ $cookiz, app, store, req, isDev }) {
  //전역 네비게이션 가드 (라우터가 변할 때 여기에 서 멈추고 next()를 통해 다음 라우터로 이동됨)
  app.router.beforeResolve(async function (to, from, next) {
    /**
     * to: 이동할 url 정보가 담긴 라우터 객체
     * from: 현재 url 정보가 담긴 라우터 객체
     * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
     * next() 가 호출되기 전까지 화면 전환되지 않음
     */
    let token = {
      accessToken: $cookiz.get('accessToken') == undefined ? null : $cookiz.get('accessToken'),
      refreshToken: $cookiz.get('refreshToken') == undefined ? null : $cookiz.get('refreshToken')
    };
    //refreshToken만 있으면 재발급 요청
    if (token.accessToken===null && token.refreshToken!==null) {
      await store.dispatch('refreshToken');
      return next({path: to.name}); //CSR 모드일 때는 이렇게 해줘야함
    }
    //둘다 없을 경우에는 여기서 요청을 너무 때려서 주석처리하고 App.uve에다가 created 훅에다가 추가함
  // if(token.accessToken === null && token.refreshToken === null){
  //   //2개 토큰이 모두 없을 경우 로그인페이지로
  //   return next({name: 'Login'});
  // }
    return next();
  });
}