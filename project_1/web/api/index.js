/**
 * API site
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 */
import express from 'express'
import bodyParser from 'body-parser'
import aRoot from 'app-root-path'

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  console.log('/api/test');
  // console.log('dotenv test : ', process.env);
  res.send('API Success!!');
})

app.post('/read-config', async (req, res) => {
  let rt = {};
  try {
    const config = require(aRoot + '/config.js').default;
    rt.error = false;
    rt.result = config;
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.result = err.message;
  }
  res.send(rt);
})

//dd
app.use('/v1/test', require('./router/test'));
app.use('/v1/vtable', require('./router/table'));
app.use('/v1/code', require('./router/code'));

module.exports = {
  path: '/api',
  handler: app
}