var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/get', function(req, res, next) {
  const token = req.headers['x-access-token'];

  console.info(token)
  res.send('respond with a resource');
});

module.exports = router;
