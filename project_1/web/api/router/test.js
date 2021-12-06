import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');

const fs = require('fs');
const mime = require('mime');
const { Worker }  = require('worker_threads');

router.post('/es_test', async (req, res) => {
  // console.log('/ElasticSearch Connection Check!');
  Log.info('/ElasticSearch Connection Check!');
  let rt = {};
  try {
    const rs =  await es_client.ping({requestTimeout : 1000});
    Log.info(rs);
    rt.error = false;
    rt.msg = rs;
  } catch (err) {
    // console.error('es_test err : ', err);
    Log.error(err);
    rt.error = true;
    rt.msg = err;
    // throw new Error(err); //프로세스 멈춰 버림
  }
  res.send(rt);
})

router.post('/worker_test', async (req, res) => {
  console.log('api/worker_test');
  const params = req.body;
  let rt = {};
  try {
    //파일 생성하는 워커 돌림
      // const query = { "query":{"bool":{"filter":[{"range":{"create_date":{"gte":"2021-11-17 11:34:01","lte":"2021-11-17 15:34:59"}}}],"must":[],"must_not":[]}}};
      // const query = { "query":{"bool":{"filter":[{"range":{"create_date":{"gte":"2021-11-17 15:34:01","lte":"2021-11-17 15:34:59"}}}],"must":[],"must_not":[]}}};
      const query = { "query":{"bool":{"filter":[{"range":{"create_date":{"gte":"2021-11-15 00:00:01","lte":"2021-11-17 23:34:59"}}}],"must":[],"must_not":[]}}};
      const index_name = 'ni_raw_threat-20211115,ni_raw_threat-20211116,ni_raw_threat-20211117';
      const headers = {"create_date":"수집일시","date_time":"탐지일시","sensor_id":"수집장비","type":"구분","attack_ip":"공격IP","attack_port":"공격포트","attack_iso":"공격국가","attack_loc":"공격지","victim_ip":"피해IP","victim_port":"피해포트","victim_iso":"피해국가","victim_loc":"피해지","inst_type":"등록기관","intent":"공격의도","n_org":"그룹명","risk":"위험도","rule_cate_m":"주분류","rule_cate_s":"세분류","rule_name":"탐지규칙명","proto":"프로토콜","payload":"페이로드","http_info":"도메인","detec_file_hash":"해쉬","detec_file_name":"파일명"};
      // const fields = ["create_date","date_time","sensor_id","type","attack_ip","attack_port","attack_iso","attack_loc","victim_ip","victim_port","victim_iso","victim_loc","inst_type","intent","n_org","risk","rule_cate_m","rule_cate_s","rule_name","proto","http_info","detec_file_hash","detec_file_name"];
      const fields = ["create_date","date_time","sensor_id","type","attack_ip","attack_port","attack_iso","attack_loc","victim_ip","victim_port","victim_iso","victim_loc","inst_type","intent","n_org","risk","rule_cate_m","rule_cate_s","rule_name","proto","payload","http_info","detec_file_hash","detec_file_name"];
      const file_name = 'test.csv';
      const setParma = {
        query : query,
        idx_name : index_name,
        file_name : file_name,
        headers : headers,
        fields : fields,
        type: false
      }
      const wk = new Worker(aRoot + '/api/worker/makeFile.js', {workerData: setParma});
      wk.on('message', (msg) => {
        console.log('worker message : ', msg);
      });
      wk.on('exit', () => {
        //워커가 끝나면 반환, 여기 전까지 웹은 정상적으로 다른 페이지도 이동가능함
      })
      rt.error = false;
      rt.msg = 'ok';
      rt.result = 'running';
    
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;