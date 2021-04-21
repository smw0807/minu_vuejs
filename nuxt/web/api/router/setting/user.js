import express from 'express'
import els from '../../els'
import { sha256, salt_sha256 } from '../../utils/sha256'
import { makeDate } from '../../utils/date'
import { sleep } from '../../utils/utils'

const router = express.Router();

const index_name = 'ni_setting';

router.get('/test', function (req, res) {
  console.log('api user test');
  res.send({test:'test'});
});

/**
 * 사용자 리스트 불러오기
 */
router.post('/list', async (req, res) => {
  console.log('/api/es/setting/user/list');
  let param = req.body;
  let error = false;
  let rs = {};
  let query = {};
  if (param.query) {
    query = param.query;
  }
  try {
    await sleep(5000);
    let search = await els.search({
      index: index_name,
      body: query
    })
    rs.error = error;
    rs.msg = search;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
})

/**
 * 사용자 등록
 */
router.post('/insertUser', async (req, res) => {
  console.log('/api/es/setting/user/insertUser');
  let param = req.body;
  let error = false;
  let rs = {};
  try {
    const user = {
      "type":"user",
      "user": {
        "user_id" : param.user_id,
        "user_nm" : param.user_nm,
        "user_pw" : salt_sha256(param.user_pw, makeDate('YYYY-MM-DD HH:mm:ss')),
        "user_auth_nm" : param.user_auth_nm,
        "user_auth_code" : param.user_auth_code,
        "user_mk_dt" : makeDate('YYYY-MM-DD HH:mm:ss'),
        "user_upd_dt" : makeDate('YYYY-MM-DD HH:mm:ss'),
        "user_desc" : param.user_desc,
        "is_use": true
      }
    }
    let ins = await els.index({
      index: index_name,
      type: '_doc',
      id: param.user_id,
      body: user
    })
    console.log(JSON.stringify(ins));
    rs.error = error;
    rs.msg = ins;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
})

/**
 * 사용자 수정
 */
router.post('/updateUser', async (req, res) => {
  console.log('/api/es/setting/user/updateUser');
  let param = req.body;
  let error = false;
  let rs = {};
  try {
    let data = {
      "type": "user",
      "user":{
        "user_upd_dt": makeDate('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (param.user_nm && param.user_nm != '') {
      data.user.user_nm = param.user_nm
    }
    if (param.user && param.user_nm != '') {
      data.user.user_nm = param.user_nm
    }
    if (param.user_pw && param.user_pw != '') {
      data.user.user_pw = salt_sha256(param.user_pw, param.user_mk_dt);
    }
    if (param.user_auth_code && param.user_auth_code != '') {
      data.user.user_auth_code = param.user_auth_code
    }
    if (param.user_auth_nm && param.user_auth_nm != '') {
      data.user.user_auth_nm = param.user_auth_nm
    }
    if (param.user_desc && param.user_desc != '') {
      data.user.user_desc = param.user_desc
    }
    const upd = await els.update({
      index: index_name,
      type: '_doc',
      id: param._id,
      body: {  doc : data }
    })
    console.log(JSON.stringify(upd));
    rs.error = error;
    rs.msg = upd;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result : rs});
})

/**
 * 사용자 삭제
 */
router.post('/deleteUser/:id', async (req, res) => {
  console.log('/api/es/setting/user/deleteUser');
  let param = req.params;
  let error = false;
  let rs = {};
  try {
    let del = await els.delete({
      index: index_name,
      type: '_doc',
      id: param.id
    })
    console.log(JSON.stringify(del));
    rs.error = error;
    rs.msg = del;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = true;
    rs.msg = err;
  }
  res.send({result: rs});
})

module.exports = router;    