import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');

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

module.exports = router;