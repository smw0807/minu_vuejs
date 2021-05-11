import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');

router.post('/list', async (req, res) => {
  console.log('/api/v1/threat/list');
  const params = req.body;
  console.log(JSON.stringify(params));
  let rs = {};
  try {

  } catch (err) {
    console.error(err);
    rs.error = true;
    rs.msg = err;
  }
  res.send(rs);
})


module.exports = router;