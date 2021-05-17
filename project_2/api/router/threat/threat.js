import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const { makeDate } = require(aRoot + '/utils/date').default;
const { flatmap, singleFlatMap } = require(aRoot + '/utils/elastic').default;
const es_client = require(aRoot + '/api/elastic');

let index_name = 'ni_test_threat-';

router.post('/list', async (req, res) => {
  console.log('/api/v1/threat/list');
  const params = req.body;
  console.log(JSON.stringify(params));
  const dt = makeDate('YYYYMMDD');
  let rt = {};
  try {
    const rs = await es_client.search({
      // index: `${index_name}${dt}`,
      index: 'test_data',
      type: '_doc',
      body: params
    })
    rt.error = false;
    rt.msg = 'ok';
    // rt.data = flatmap(rs);
    rt.data = singleFlatMap(rs);
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = err;
    rt.data = 'err';
  }
  res.send(rt);
})


module.exports = router;