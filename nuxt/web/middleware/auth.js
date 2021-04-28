import jwt from 'jsonwebtoken';

export default async function({ $cookiz, route, store, redirect }) {
  let token = {
    accessToken: $cookiz.get('accessToken') ? $cookiz.get('accessToken') : null,
    refreshToken: $cookiz.get('refreshToken') ? $cookiz.get('refreshToken') : null
  };
  store.auth_id = 0;
  console.log('?? : ', route.path);
  //로그인 페이지는 권한체크 제외
  if (route.path.includes('/login')) {
    return false;
  }

  //로그인
  try {
    if (!token.accessToken && !token.refreshToken) {
      alert('로그인이 필요합니다.');
      return redirect('/login');
    }

    if ((!token.accessToken || (token.accessToken && !token.accessToken.auth_id)) && token.refreshToken) {
      //refreshToken만 있으면 재발급 요청
      let res = await store.dispatch('login/refreshToken');
      if (res && res.accessToken && res.refreshToken) {
        token = {
          accessToken: $cookiz.get('accessToken') ? $cookiz.get('accessToken') : null,
          refreshToken: $cookiz.get('refreshToken') ? $cookiz.get('refreshToken') : null
        };
        console.log('refresh token successed!');
      } else {
        throw 'refresh token failed..';
      }
    }

    if (token.accessToken) {
      let decoded = jwt.decode(token.accessToken);
      store.auth_id = decoded && decoded.auth_id ? decoded.auth_id : 0;
    }
  } catch (error) {
    console.log(error);
    alert('로그인 만료');
    await store.dispatch('login/logout');
    return redirect('/login');
  }

  //권한 요구 페이지
  try {
    const auth_arr = route.meta.filter(x => {
      if (x.hasOwnProperty('auth')) {
        return x.auth;
      }
    });

    console.log(auth_arr);
    if (auth_arr.length > 0 && !auth_arr[0].auth.includes(store.auth_id)) {
      alert('접근 권한이 없습니다.');
      return redirect('/');
    }
  } catch (error) {
    console.log(error);
    alert('권한 확인 중 에러가 발생하였습니다.\n다시 로그인 해 주세요.');
    await store.dispatch('logout');
    return redirect('/login');
  }
}
