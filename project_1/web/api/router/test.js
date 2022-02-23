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

let woerkerNumber = 0;
let q = [];
router.post('/test_worker', async (req, res) => {
  console.log('api/test_worker');
  let rt = {};
  try {
    console.log('woerkerNumber : ', woerkerNumber);
    if (woerkerNumber < 5) {
      woerkerNumber++;
      console.info('11111');
      let wk = new Worker(aRoot + '/api/worker/test.js', {workerData: {number : woerkerNumber}});
      wk.on('message', (msg) => {
        console.log('message : ', msg);
      });
      wk.on('exit', (n) => {
        woerkerNumber--;
        console.log('스레드 종료', n);
      })
      rt.error = false;
      rt.msg = 'ok';
      rt.result = true;
    } else {
      console.info('2222');
      rt.error = false;
      rt.msg = 'over';
      rt.result = false;
    }

  } catch (err) {
    console.error(err);
  }
  res.send(rt);
})

router.post('/run_worker', async (req, res) => {
  console.log('api/run_worker');
  const params = req.body;
  let rt = {};
  try {
    //파일 생성하는 워커 돌림
    const query = {
      "query": {
        "bool": {
          "filter": [
            {
              "range": {
                "time_start": {
                  "gte": "2022-02-23 08:32:00",
                  "lte": "2022-02-23 08:46:59"
                }
              }
            },
            {
              "range": {
                "time_end": {
                  "gte": "2022-02-23 08:32:00",
                  "lte": "2022-02-23 08:46:59"
                }
              }
            }
          ],
          "must": [
            {
              "terms": {
                "sensor_id": [
                  1,
                  9,
                  10
                ]
              }
            }
          ],
          "must_not": []
        }
      },
      "_source": [
        "time_start",
        "time_end",
        "create_date",
        "sensor_id",
        "n_org",
        "n_ip",
        "n_ip_alias",
        "n_port",
        "n_mac",
        "e_ip",
        "e_ip_alias",
        "e_port",
        "e_mac",
        "proto",
        "uri",
        "app_grp",
        "app",
        "in_byte",
        "out_byte",
        "in_pkt",
        "out_pkt",
        "ttl",
        "in_cps",
        "out_cps",
        "conn_cplt",
        "conn_incplt",
        "in_qoe",
        "out_qoe"
      ]
    }
    const headers = {
      "time_start": "수집 시작 일시",
      "time_end": "수집 종료 일시",
      "create_date": "생성일시",
      "sensor_id": "수집장비명",
      "n_org": "그룹",
      "n_ip": "내부 IP",
      "n_ip_alias": "내부 IP 별칭",
      "n_port": "내부 PORT",
      "n_mac": "내부 MAC",
      "e_ip": "외부 IP",
      "e_ip_alias": "외부 IP 별칭",
      "e_port": "외부 PORT",
      "e_mac": "외부 MAC",
      "proto": "프로토콜",
      "uri": "도메인",
      "app_grp": "응용 그룹",
      "app": "응용",
      "in_byte": "IN Byte",
      "out_byte": "OUT Byte",
      "in_pkt": "IN pkt",
      "out_pkt": "OUT pkt",
      "ttl": "ttl",
      "in_cps": "in_cps",
      "out_cps": "out_cps",
      "conn_cplt": "conn_cplt",
      "conn_incplt": "conn_incplt",
      "in_qoe": "in_qoe",
      "out_qoe": "out_qoe"
    };
    const fields = [
      "time_start",
      "time_end",
      "create_date",
      "sensor_id",
      "n_org",
      "n_ip",
      "n_ip_alias",
      "n_port",
      "n_mac",
      "e_ip",
      "e_ip_alias",
      "e_port",
      "e_mac",
      "proto",
      "uri",
      "app_grp",
      "app",
      "in_byte",
      "out_byte",
      "in_pkt",
      "out_pkt",
      "ttl",
      "in_cps",
      "out_cps",
      "conn_cplt",
      "conn_incplt",
      "in_qoe",
      "out_qoe"
    ];
    const setParma = {
      "user_id": "smw0807",
      "user_nm": "송민우",
      "query" : query,
      "idx_name": "ni_raw_flw-20220223",
      "file_name": "플로우 검색",
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