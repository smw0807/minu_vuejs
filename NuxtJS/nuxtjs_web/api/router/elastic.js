const express = require('express');
const router = express.Router();
const els = require('../els');

router.post('/', async (req, res) => {
  console.log('/api/es/');
  res.json('dd');
})

router.post('/:idx', async (req, res) => {
  let idx = req.params.idx;
  console.log('api/get/:idx : ', idx);
  els.search({
    index: idx
  }, (err, rs) => {
    if (err) {
      console.log('err : ', err);
      res.json({error: true, massage: err});
    } else {
      // console.log(rs);
      res.json({error: false, massage: rs});
    }
  })
})

module.exports = router;