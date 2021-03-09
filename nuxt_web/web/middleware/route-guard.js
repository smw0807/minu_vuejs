// console.log('route-guard1');
// export default async function ({ $cookiz, app, store, req, isDev }) {
//   console.log('route-guard2');
//   //전역 네비게이션 가드
//   console.log('route-guard3');
//   let token = {
//     accessToken: $cookiz.get('accessToken') == undefined ? null : $cookiz.get('accessToken'),
//     refreshToken: $cookiz.get('refreshToken') == undefined ? null : $cookiz.get('refreshToken')
//   };
//   //refreshToken만 있으면 재발급 요청
//   if (token.accessToken === null && token.refreshToken !== null) {
//     await store.dispatch('refreshToken');
//   }
// }