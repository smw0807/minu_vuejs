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

let isRuning = false;
router.post('/worker_test', async (req, res) => {
  console.log('api/worker_test');
  const params = req.body;
  let rt = {};
  try {
    //파일 생성하는 워커 돌림
    if (!isRuning) {
      isRuning = true;
      const wk = new Worker(aRoot + '/api/worker/makeFile.js', {workerData: params});
      wk.on('message', (msg) => {
        //만들면서 파일 정보 중간에 받아서 셋팅
        const file = fs.readFileSync(aRoot + '/api/files/' + msg);
        const mimetype = mime.getType(msg);
        rt.info = {
          fileName : msg,
          content : file,
          type: mimetype
        }
      });
      wk.on('exit', () => {
        //워커가 끝나면 반환, 여기 전까지 웹은 정상적으로 다른 페이지도 이동가능함
        console.log('worker end');
        isRuning = false;
        rt.error = false;
        rt.msg = 'worker';
        rt.result = 'hi';
        res.send(rt);
      })
    } else {
      rt.error = false;
      rt.msg = 'already';
      rt.result = null;
      res.send(rt);
    }
    
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err;
    res.send(rt);
  }
  // res.send(rt);
})

module.exports = router;