import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap } = require(aRoot + '/utils/elastic').default;

let index_name = 'idx_test1';

router.post('/list', async (req, res) => {
  console.log('/api/test/list');
  const params = req.body;
  console.log(JSON.stringify(params));
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


module.exports = router;