const express = require('express');

const router = express.Router();
const es_client = require('../elastic.js');

const idx_arr = [
  'idx',
  'ni'
  // 'idx_test1',
  // 'idx_file',
  // 'ni_setting'
]

/**
 * 엘라스틱서치 핑 테스트
 */
router.post('/es_ping', async (req, res) => {
  // console.log('/ElasticSearch Connection Check!');
  let rt = {};
  try {
    const rs =  await es_client.ping({requestTimeout : 1000});
    rt.error = false;
    rt.result = rs;
  } catch (err) {
    console.error('es_test err : ', err);
    rt.error = true;
    rt.result = err;
    // throw new Error(err); //프로세스 멈춰 버림
  }
  res.send(rt);
})

/**
 * 엘라스틱서치 노드 디스크 용량
 */
router.post('/els_node_infos', async (req, res ) => {
  let response = {};
  try {
    const rs = await es_client.cat.nodes({
      bytes: 'mb',
      h: ['name', 'disk.used_percent'],
    });
    const arr = rs.split('\n');
    let result = [];
    for (let v of arr) {
      if (v.length > 0) {
        let data = v.split(' '); 
        let rt = {
          name : data[0],
          usage : data[1]
        }
        result.push(rt);
      }
    }
    response.error = false;
    response.result = result;
    console.log(result);
  } catch (err) {
    response.error = true;
    response.result = err;
    console.error(err)
  }
  res.send(response);
})

/**
 * 델라스틱서치 인덱스 타입별 및 인덱스별 데이터 수, 용량
 */
router.post('/els_idx_infos', async (req,res) => {
  let response = {};
  try {
    let idx_infos = [];
    for (let item of idx_arr) {
      const rs = await es_client.indices.stats({
        index : item + '*',
      })
      console.log(rs);
      let info = {
        index_type : item,
        doc_count : rs._all.total.docs.count,
        size : rs._all.total.store.size_in_bytes,
        indices: []
      }
      const arr = Object.keys(rs.indices);
      for (let v of arr) {
        const data = rs.indices[v].total;
        info.indices.push({
          index_name : v,
          doc_count : data.docs.count,
          size : data.store.size_in_bytes
        })
      }
      idx_infos.push(info);
    }
    response.error = false;
    response.msg = 'ok';
    response.result = idx_infos;

    console.dir(response, {depth: 5});
  } catch (err) {
    console.error(err);
    response.error = true;
    response.msg = 'err';
    response.result = err;
  }
  res.send(response);
})

module.exports = router;