/**
 * 라우터 미들웨어
 * 라우터 이동마다 실행함
 * 
 * route인자에 라우터 정보 있어서 store에 사용자 권한이나 토큰 같은걸 가져와서
 * 추가적인 이벤트 처리를 하거나 안하는 로직을 작성하면될듯
 * 
 * 보통은 토큰 유효성 체크로 사용하긴 했음
 */
export default function ({store, route, redirect, context}) {
  const auth = ['/vue/authtest'];
  // console.log('middleware/router.js', store, route);
  // console.log('middleware/router.js : ', route);
  // console.log(route.query);
  // console.log(Object.keys(route.query).length === 0);
  // console.log(route.query.constructor === Object);
  
  //2022-01-28 일단 다시 주석처리 다시 고민해보고 만들어야함
  // console.log(route.path);
  // if (auth.indexOf(route.path) !== -1) {
  //   console.log(true);
  //   if (Object.keys(route.query).length !== 0 && route.query.constructor === Object) {
  //     //url에 query가 있을 경우.... 회사에서 권한 관련해서 필요해서 가능한지 테스트해본건데 가능한듯함.
  //     console.log('yes query string : ', route);
  //     console.log('yes query string : ', route.query);
  //     console.log('yes query string : ', route.path);
  //     if (Object.values(route.query)[0] === 'true') {
  //       console.log('is_ok');
  //       redirect(route.path); //이렇게 하면 결국 없음2에 걸려서 막힘;
  //     } else {
  //       console.warn('접근 권한이 없습니다.1');
  //       alert('접근 권한이 없습니다.');
  //       redirect('/');
  //     }
  //   } else {
  //     console.warn('접근 권한이 없습니다.2');
  //     alert('접근 권한이 없습니다.');
  //     redirect('/');
  //   }
  // }
}