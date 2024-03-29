import express from 'express'
import aRoot from 'app-root-path'

// const mime = require('mime');
const { Worker }  = require('worker_threads');

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap } = require(aRoot + '/utils/elastic').default;
const json2csv = require('json2csv').parse;
const fs = require('fs');
const moment = require('moment')
const { Parser } = require('json2csv');

router.post('/list', async (req, res) => {
  console.log('/api/v1/csv/list');
  let rt = {};
  try {
    let q = {
      size: 1000
    }
    const search = await es_client.search({
      index: 'idx_test1',
      body: q
    })
    // console.dir(search, {depth:3});
    rt.error = false;
    rt.msg = 'ok';
    rt.result = singleFlatMap(search);
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
})

// router.post('/download', async (req, res) => {
router.get('/download', async (req, res) => {
  console.log('/api/v1/csv/download');
  const params = JSON.parse(req.query.q);
  let rt = {};
  try {
    let q = {
      size: 2
    }
    const search = await es_client.search({
      index: 'idx_test1',
      body: q
    })
    const date = moment();

    const data = singleFlatMap(search);
    const csvFileName = 'csv_download_' + date.format('YYYYMMDDHHmmss') + '.csv';
    const path = aRoot + '/csv_tmp/' + csvFileName;
    //========================================================== Test1 S
    const fields = params.field;
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(data);

    rt.result = csv;
    rt.fileName = csvFileName;
    res.send(rt);
    
    // fs.writeFile(path, csv, function (err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     res.setHeader("Content-disposition", "attachment : filename=" + csvFileName);
    //     res.set("Content-Type", "text/csv");
    //     fs.createReadStream(path).pipe(res).on('finish', () => {
    //       console.log('download success?');
    //       fs.unlinkSync(path);
    //     })
    //   }
    // })
    // res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    // res.set('Content-Type', 'text/csv');
    // res.status(200).send(csv);
    // res.status(200).send(csv);
    // fs.writeFile(path, csv, function (err, data) {
    //   if (err) {
    //     console.error(err);
    //     res.send(err);
    //   } else {
    //     console.log('write!');
    //     console.log(path);
    //     console.log(data);
        // res.setHeader("Content-Type", "text/csv");
        // res.setHeader("Content-Disposition", "attachment; filename=csv_download.csv");
    //     res.attachment('csv_download.csv');
    //     res.status(200).end(csv);
    //   }
    // });
    //========================================================== Test1 E
    //========================================================== Test1 S
    // const csv =  json2csv(data, params.field); //field적용 안되는거 원인 파악 필요
    // fs.writeFile(path, csv, function (err, data) {
    //   if (err) {
    //     console.error(err);
    //     res.send(err);
    //   } else {
    //     console.error(err);
    //     console.log('data!!' ,data);
    //     res.setHeader("Content-Type", "text/csv");
    //     res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    //     res.download(path);
    //     res.send(true);
    //   }
    // });
    //========================================================== Test1 E

    //========================================================== Test2 S
    //========================================================== Test2 E
    /**
     * 
      const { createReadStream, createWriteStream } = require('fs');
      const { Transform } = require('json2csv');

      const fields = ['field1', 'field2', 'field3'];
      const opts = { fields };
      const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

      const input = createReadStream(inputPath, { encoding: 'utf8' });
      const output = createWriteStream(outputPath, { encoding: 'utf8' });
      const json2csv = new Transform(opts, transformOpts);

      const processor = input.pipe(json2csv).pipe(output);
     */
    //------------ 지금 이부분이 안되는데 get으로 처리하면 params는 어떻게 해야하지?
    // res.setHeader("Content-Type", "text/csv");
    // res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    // res.download(csvData);
    // res.send(true);
    //------------
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
    res.send(rt);
  }
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
    rt.result = err.message;
  }
  res.send(rt);
})


module.exports = router;