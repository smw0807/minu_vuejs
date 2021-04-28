import aRoot from 'app-root-path'
import express from 'express'
import els from '../els'
const { encryptPassword, certifyPassword, generateAccessToken, generateRefreshToken, certifyRefreshToken } =  require(aRoot + '/api/utils/authenticate');

const router = express.Router();

const index_name = 'ni_setting';
const r_time = 60 * 60; //1시간
const access_time = 60;

router.post('/login', async (req, res) => {
  console.log('/api/es/login');
  const param = req.body;
  let error = false;
  let rs = {};
  console.log('login...', param);
  try {
    const user_id = param.user_id;
    const user_pw = param.user_pw;
    const search = await els.search({
      index: index_name,
      type: '_doc',
      body: {
        "query":{
          "bool":{
            "must":[
              {"term":{"type":"user"}},
              {"term":{"user.user_id": user_id}}
            ]
          }
        }
      }
    })
    // console.log(search);
    if (search.hits.hits.length === 0) {
      rs.error = true;
      rs.msg = '존재하지 않는 아이디입니다.';
    } else {
      const data = search.hits.hits[0]._source;
      // const pass = salt_sha256(user_pw, data.user.user_mk_dt);
      const passCheck = certifyPassword(user_pw, data.user.user_pw);
      if (passCheck) {
        const uid = user_id;
        const pass = data.user.user_pw;
        const auth_id = data.user.user_id;
        const accessToken = generateAccessToken({ uid, auth_id}, access_time);
        const refreshToken = generateRefreshToken({ uid, pass, auth_id }, r_time);
        userMap.set(uid, refreshToken);

        rs.error = error;
        rs.msg = '로그인 성공';
        rs.auth_info = {
          'accessToken' : accessToken,
          'refreshToken': refreshToken
        };
        rs.user = data;
        
      } else {
        rs.error = true;
        rs.msg = '패스워드가 일치하지 않습니다.';
      }
      // if (pass !== data.user.user_pw) {
      //   rs.error = true;
      //   rs.msg = '패스워드가 일치하지 않습니다.';
      // } else {
      //   const accessToken = await makeAccessToken(data);
      //   const refreshToken = await makeRefreshToken(data);
      //   rs.error = error;
      //   rs.msg = '로그인 선공';
      //   rs.auth_info = {
      //     'accessToken' : accessToken,
      //     'refreshToken': refreshToken
      //   };
      //   rs.user = data;
      // }
    }
  } catch (err) { 
    console.error('login Error : ', err);
  }
  // const data = param._source;
  // let error = false;
  // try {
  //   const accessToken = await makeAccessToken(data);
  //   const refreshToken = await makeRefreshToken(data);
  //   rs.auth_info = {
  //     'accessToken': accessToken,
  //     'refreshToken': refreshToken
  //   }
  // } catch (err) {
  //   console.log('login Error : ', err);
  //   error = true;
  //   rs.error = error;
  //   rs.msg = err;
  // }
  res.send({result: rs});
});

router.post('/certify', async (req, res) => {
  console.log('api/es/login/certify');
  let rs = {};
  let error = false;
  let rt_status = 401;
  const refreshToken = req.headers['x-refresh-token'];
  try {
    let token = await certifyRefreshToken(refreshToken);
    let { uid, auth_id } = token;
    let matchToken = userMap.get(uid);
    if (matchToken && refreshToken === matchToken) {
      const accessToken = generateAccessToken({ uid, auth_id }, access_time);
      rs.error = error;
      rs.msg = 'ok';
      rs.uath_info = {
        'accessToken' : accessToken, 
        'refreshToken' : refreshToken
      }
    } else {
      console.log('refresh Token 만료??');
      rs.error = true;
      rs.msg = 'refreshToken 만료';
    }
  } catch (err) {
    console.error('certify Error : ', err);
  }
  res.send({result: rs});
})

router.post('/login/:id', async (req, res) => {
  console.log('/api/es/:id');
  const id = req.params.id;
  let error = false;
  let rs = {};
  try {
    const result = await els.search({
      index: index_name,
      type: '_doc',
      body: {
        "query":{
          "bool":{
            "must":[
              {"term":{"type":"user"}},
              {"term":{"user.user_id": id}}
            ]
          }
        }
      }
    })
    rs.error = error;
    rs.msg = result;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
});

module.exports = router;