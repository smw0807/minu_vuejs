// const express = require('express');
// const els = require('../../els');
// const { sha256, salt_sha256 } = require('../../utils/sha256');
// const { makeDate } = require('../../utils/date');
import express from 'express'
import els from '../../els'
import { sha256, salt_sha256 } from '../../utils/sha256'
import { makeDate } from '../../utils/date'

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
    let search = await els.search({
      index: index_name,
      body: query
    })
    rs.error = error;
    rs.msg = search;
  } catch (err) {
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
    rs.error = error;
    rs.msg = ins;
  } catch (err) {
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
})

module.exports = router;    