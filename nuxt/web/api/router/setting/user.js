const express = require('express');
const router = express.Router();
const els = require('../../els');

const index_name = 'ni_user';

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
  console.log(param);
  let error = false;
  let rs = {};
  try {
    //사용자 추가 로직 넣기
  } catch (err) {
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
})

module.exports = router;    