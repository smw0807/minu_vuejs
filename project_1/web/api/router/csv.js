import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap } = require(aRoot + '/utils/elastic').default;
const CsvParser = require('json2csv').Parser;

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

router.post('/download', async (req, res) => {
  console.log('/api/v1/csv/download');
  const params = req.body;
  console.table(params);
  let rt = {};
  try {
    let q = {
      size: 1000
    }
    const search = await es_client.search({
      index: 'idx_test1',
      body: q
    })
    const data = singleFlatMap(search);
    const csvFields = params.field;
    const csvParser = new CsvParser({csvFields});
    const csvData = csvParser.parse(data);
    //------------ 지금 이부분이 안되는데 get으로 처리하면 params는 어떻게 해야하지?
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    res.send(csvData);
    //------------
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
    res.send(rt);
  }
})

module.exports = router;