// console.log('route-guard1');
// export default function ({$cookiz, app, store }) {
//   console.log('route-guard2');
//   app.router.beforeResolve( async (to, from, next) => {
//        //전역 네비게이션 가드
//     console.log('route-guard3');
//     let token = {
//       accessToken: $cookiz.get('accessToken') == undefined ? null : $cookiz.get('accessToken'),
//       refreshToken: $cookiz.get('refreshToken') == undefined ? null : $cookiz.get('refreshToken')
//     };
//     console.log(token);
//     //refreshToken만 있으면 재발급 요청
//     if (token.accessToken === null && token.refreshToken !== null) {
//       console.log('route-guard4');
//       await store.dispatch('refreshToken');
//     }
//     next();
//   });
// }