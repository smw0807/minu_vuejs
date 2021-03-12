var express = require('express');
var router = express.Router();
var movies = require('../movies.json');

const authenticateUtils = require('../util/authenticate');

/*
let aaa = async function (req, res, next){
  const token = req.headers['x-access-token'];

  try{
    let ss = await authenticateUtils.certifyAccessToken(token);
    
    console.info(ss);

    return next();
  }catch(err) {    
    console.info(err);
    res.status(401).json({
      msg:"fail"
    });

  }
  console.info("aaa ");   
};
*/

router.get('/', authenticateUtils.authCheck, function (req, res, next) {
  console.info("aaaaa");

  const token = req.headers['x-access-token'];



  console.info(token);
  console.info("rrr ::: " + req.headers['x-refresh-token']);



	res.send(movies);
//  res.send(movies);
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10);
  var movie = movies.filter(function (movie) { return movie.id === id });
  res.send(movie)
});

module.exports = router;
