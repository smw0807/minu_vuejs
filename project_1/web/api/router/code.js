import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { flatmap } = require(aRoot + '/utils/elastic').default;

const index_name = 'ni_setting';

router.post('/tree_list', async (req, res) => {
  console.log('/api/v1/code/tree_list');
  let rt = {};
  try {
    const params = req.body;
    // console.log(params);
    let q = {
      size: 15,
      query: {
        bool: {
          must: [
            {
              term: {
                type: 'test1_code'
              }
            }
          ],
          must_not: [
            {
              term: {
                "test1_code.level" : 9
              }
            }
          ]
        }
      },
      sort:[
        { "test1_code.level" : "asc" },
        { "test1_code.pcode" : "desc" }
      ]
    }
    // console.log(JSON.stringify(q));
    const rs = await es_client.search({
      index: index_name,
      type: '_doc',
      body: q
    })
    // console.dir(rs, {depth: 5});
    rt.error = false;
    rt.msg = 'ok';
    rt.result = flatmap(rs);
  } catch (err) {
    console.log('tree_list err : ', err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});

router.post('/code_list', async (req, res) => {
  console.log('/api/v1/code/code_list');
  let rt = {};
  try {
    const params = req.body;
    let q = {
      query: {
        bool: {
          must: [
            {
              term: {
                type: 'test1_code'
              }
            },
            {
              term: {
                "test1_code.level": 9
              }
            }
          ]
        }
      }
    }
    console.log(q);
    //code가 main일 때
    //main이 아니면 트리에서 선택한 code 값으로 pcode: code + level: 9인 데이터 검색?
    //flag로 검색?
    rt.error = false;
    rt.msg = 'test';
    rt.result = 'test';
  } catch (err) {
    console.log('code_list err : ', err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
})

module.exports = router;