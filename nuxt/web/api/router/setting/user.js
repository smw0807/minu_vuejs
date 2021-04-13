const express = require('express');
const router = express.Router();
const els = require('../../els');

const index_name = 'ni_user';

router.get('/test', function (req, res) {
  console.log('api user test');
  res.send({test:'test'});
});

router.post('/list', async (req, res) => {
  console.log('/api/es/setting/user/list');
  
  let error = false;
  let rs = {};
  try {
    let search = await els.search({
      index: index_name,
      body: {

      }
    })
    rs.error = error;
    rs.msg = search;
  } catch (err) {
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
})


module.exports = router;    