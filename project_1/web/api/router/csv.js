import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const { singleFlatMap } = require(aRoot + '/utils/elastic').default;
const json2csv = require('json2csv').parse;
const fs = require('fs');

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
  console.log(req.query);
  const params = JSON.parse(req.query.q);
  console.table(params);
  let rt = {};
  try {
    let q = {
      size: 2
    }
    const search = await es_client.search({
      index: 'idx_test1',
      body: q
    })
    const data = singleFlatMap(search);
    const path = aRoot + '/csv_tmp/csv_download.csv';
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

module.exports = router;