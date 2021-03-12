import express from 'express';
import movies from '../../assets/data/movies.json';

var router = express.Router();

const authenticateUtils = require('../../utils/authenticate');

router.get('/', authenticateUtils.authCheck, function (req, res, next) {
  console.info("aaaaa");
  const token = req.headers['x-access-token'];

  console.info(token);
  console.info("rrr ::: " + req.headers['x-refresh-token']);
	res.send(movies);
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10);
  var movie = movies.filter(function (movie) { return movie.id === id });
  res.send(movie)
});

module.exports = router;
