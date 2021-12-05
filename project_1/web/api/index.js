/**
 * API site
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 */
// process.env.DEBUG = 'nuxt:*';
import express from 'express'
import bodyParser from 'body-parser'
const app = express();

const aRoot = require('app-root-path');
const Logd = require(aRoot + '/log');
const log = new Logd('express');
global.Log = log;

// //nuxt.config.js 파일 읽는 법??
// const { Nuxt, Builder } = require('nuxt');
// const config = require(aRoot + '/nuxt.config.js'); 
// console.log('read nuxt.config.js??? : ', config);

app.use(express.json());
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  console.log('/api/test');
  Log.info('/api/test');
  // console.log('dotenv test : ', process.env);
  res.send('API Success!!');
})

app.use('/v1/test', require('./router/test'));
app.use('/v1/vtable', require('./router/table'));
app.use('/v1/code', require('./router/code'));
app.use('/v1/csv', require('./router/csv'));
app.use('/v1/file', require('./router/file'));
app.use('/v1/els', require('./router/els_info'));

module.exports = {
  path: '/api',
  handler: app
}