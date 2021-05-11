/**
 * API site
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 */
 import express from 'express'
 import bodyParser from 'body-parser'
 
 const app = express();
 
 app.use(express.json());
 app.use(bodyParser.json());
 
 app.post('/test', (req, res) => {
   console.log('/api/test');
   res.send('API Success!!');
 })
 
 //dd
 app.use('/v1/test', require('./router/test'));
 app.use('/v1/threat', require('./router/threat/threat'));
 
 module.exports = {
   path: '/api',
   handler: app
 }