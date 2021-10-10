/**
 * 라우터 미들웨어
 * 라우터 이동마다 실행함
 * 
 * route인자에 라우터 정보 있어서 store에 사용자 권한이나 토큰 같은걸 가져와서
 * 추가적인 이벤트 처리를 하거나 안하는 로직을 작성하면될듯
 * 
 * 보통은 토큰 유효성 체크로 사용하긴 했음
 */
export default function ({store, route}) {
  // console.log('middleware/router.js', store, route);
}