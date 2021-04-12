const express = require('express');
const router = express.Router();
const data = require('../model/testDataSet');

router.post('/', async (req, res) => {
  console.log('/api/test');
  data.find(function (err, rs) {
    if (err) {
      console.log('err :', err);
    }
    console.log(rs);
    res.json(rs);
  })
});

router.post('/search1', async (req, res) =>{
  console.log('/api/test/search1');
  data.aggregate([
    {
      $group:{
        _id: "$institutionName",
        count: {$sum:1}
      }
    },
    {
      $sort:{ // 내림 차순으로 sort (오름 차순은 1)
        count: -1
      }
    }
  ], function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      console.log(rs);
      res.json(rs);
    }
  })
});

module.exports = router;