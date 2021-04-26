import express from 'express'
import els from '../els'
import { makeAccessToken, makeRefreshToken } from '../utils/auth'
import { salt_sha256 } from '../utils/sha256'
import auth from '@nuxtjs/auth-next'

const router = express.Router();

const index_name = 'ni_setting';

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
    console.log(search);
    if (search.hits.hits.length === 0) {
      rs.error = true;
      rs.msg = '존재하지 않는 아이디입니다.';
    } else {
      const data = search.hits.hits[0]._source;
      console.log(data);
      const pass = salt_sha256(user_pw, data.user.user_mk_dt);
      if (pass !== data.user.user_pw) {
        rs.error = true;
        rs.msg = '패스워드가 일치하지 않습니다.';
      } else {
        const accessToken = await makeAccessToken(data);
        const refreshToken = await makeRefreshToken(data);
        rs.error = error;
        rs.msg = '로그인 선공';
        rs.auth_info = {
          'accessToken' : accessToken,
          'refreshToken': refreshToken
        };
        console.log(auth);
        // this.$auth.strategy.token.set('...')
      }
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