import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');

router.post('/es_test', async (req, res) => {
  console.log('/ElasticSearch Connection Check!');
  let rt = {};
  try {
    const rs =  await es_client.ping({requestTimeout : 1000});
    console.log(rs);
    rt.error = false;
    rt.msg = rs;
  } catch (err) {
    console.error('es_test err : ', err);
    rt.error = true;
    rt.msg = err;
  }
  res.send(rt);
})

module.exports = router;