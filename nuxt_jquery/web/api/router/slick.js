import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap, flatmap } = require(aRoot + '/utils/elastic').default;
const { make_list_query } = require('./slick_util').default;
const { sleep } = require(aRoot + '/utils/utils').default;
const { makeDate } = require(aRoot + '/utils/date').default;

let index_name = 'idx_test1';

router.post('/list', async (req, res) => {
  console.log('/api/slick/list');
  const params = req.body;
  console.log(JSON.stringify(params));
  console.table(params);
  console.table(params.filters);
  let rt = {};
  try {
    let q = {
      size: params.size,
      query:{
        bool:{
          must:[]
        }
      },
      sort: JSON.parse(params.sort)
    }
    console.log(JSON.stringify(q));
    const rs = await es_client.search({
      index: `${index_name}`,
      type: '_doc',
      body: q
    })
    rt.error = false;
    rt.msg = 'ok';
    rt.data = singleFlatMap(rs);
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = err;
    rt.data = 'err';
  }
  res.send(rt);
})

//검색조건 저장 리스트
router.post('/save_filter_list', async (req, res) => {
  console.log('/api/slick/save_filter_list');
  const params = req.body;
  let rt = {}
  try {
    let q = {
      "size": 5000,
      "query":{
        "bool":{
          "must":[
            {
              "term":{
                "type":"save_filter"
              }
            },
            {
              "term":{
                "save_filter.user_id":"admin"
              }
            }
          ]
        }
      },
      "sort":{
        "save_filter.upd_dt":"desc"
      }
    }
    const rs = await es_client.search({
      index: 'ni_setting',
      type: '_doc',
      body: q
    });
    rt.error = false;
    rt.msg = 'ok';
    rt.result = flatmap(rs);
  } catch (err) {
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
    console.error(err);
  }
  res.send(rt);
});

//검색조건 저장 데이터 등록
router.post('/ins_filter', async (req, res) => {
  console.log('/api/slick/ins_filter');
  const params = req.body;
  // console.log(JSON.stringify(params));
  let rt = {};
  try {
    const data = {
      "type":"save_filter",
      "save_filter":{
        "user_id":"admin",
        "user_nm": "관리자",
        "title": params.title,
        "desc": params.desc,
        "mk_dt": makeDate('YYYY-MM-DD HH:mm:ss'),
        "upd_dt": makeDate('YYYY-MM-DD HH:mm:ss'),
        "data": params.filters
      }
    };
    const rs = await es_client.index({
      index: 'ni_setting',
      type: '_doc',
      body: data
    });
    rt.error = false;
    rt.msg = 'ok';
    rt.result = rs;
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});

//검색조건 저장 데이터 수정
router.post('/upd_filter', async (req, res) => {
  console.log('/api/slick/upd_filter');
  const params = req.body;
  // console.log(JSON.stringify(params));
  let rt = {};
  try {
    const data = {
      "type":"save_filter",
      "save_filter":{
        "user_id":"admin",
        "user_nm": "관리자",
        "title": params.title,
        "desc": params.desc,
        "upd_dt": makeDate('YYYY-MM-DD HH:mm:ss'),
      }
    };
    const rs = await es_client.update({
      index: 'ni_setting',
      type: '_doc',
      id: params._id,
      body: { doc: data }
    });
    rt.error = false;
    rt.msg = 'ok';
    rt.result = rs;
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});

//검색조건 저장 데이터 삭제
router.post('/del_filter', async (req, res) => {
  console.log('/api/slick/del_filter');
  const params = req.body;
  // console.log(JSON.stringify(params));
  let rt = {};
  try {
    const rs = await es_client.delete({
      index: 'ni_setting',
      type: '_doc',
      id: params._id
    });
    rt.error = false;
    rt.msg = 'ok';
    rt.result = rs;
  } catch (err) {
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});


module.exports = router;