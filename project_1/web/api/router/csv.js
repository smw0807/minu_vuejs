import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');

// router.post('')

module.exports = router;