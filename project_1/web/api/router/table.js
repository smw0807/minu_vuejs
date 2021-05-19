import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap } = require(aRoot + '/utils/elastic').default;

const index_name = 'test_data';

router.post('/list', async (req, res) => {
  console.log('/api/v1/vtable/list');
  let rt = {};
  try {
    let q = {
      size: 1000,
      query: {
        bool: {
          must: [

          ],
          must_not: [

          ]
        }
      }
    }
    const search = await es_client.search({
      index: index_name,
      body: q
    })
    rt.error = false;
    rt.data = singleFlatMap(search);
    rt.msg = 'ok';
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.data = err;
    rt.msg = 'no';
  }
  res.send(rt);
})

module.exports = router;