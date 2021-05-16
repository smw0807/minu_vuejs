/**
 * API site
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 */
 import express from 'express'
 import bodyParser from 'body-parser'
 import aRoot from 'app-root-path'
 
 const app = express();
 const es_client = require(aRoot + '/api/elastic');
 
 app.use(express.json());
 app.use(bodyParser.json());
 
 app.post('/test', (req, res) => {
   console.log('/api/test');
   res.send('API Success!!');
 })
 
 //ElasticSearch ping test
 app.post('/es_test', async (req, res) => {
  console.log('/ElasticSearch Connection Check!');
  let rt = {};
  try {
    const rs =  await es_client.ping({requestTimeout : 1000});
    console.log(rs);
    rt.error = false;
    rt.msg = rs;
  } catch (err) {
    console.error('es_test err : ', err);
    rt.error = true;
    rt.msg = err;
  }
  res.send(rt);
})

 //router
 app.use('/v1/threat', require('./router/threat/threat'));
 
 module.exports = {
   path: '/api',
   handler: app
 }