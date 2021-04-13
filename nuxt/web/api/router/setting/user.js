const express = require('express');
const router = express.Router();
const els = require('../../els');

router.get('/test', function (req, res) {
  console.log('api user test');
  res.send({test:'test'});
});


module.exports = router;    