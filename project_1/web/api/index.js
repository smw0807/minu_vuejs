/**
 * API site
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 */
// process.env.DEBUG = 'nuxt:*';
import express from 'express'
import bodyParser from 'body-parser'
const app = express();

// //nuxt.config.js 파일 읽는 법??
// const { Nuxt, Builder } = require('nuxt');
// const config = require(aRoot + '/nuxt.config.js'); 
// console.log('read nuxt.config.js??? : ', config);

// const env = require('dotenv').config({
//   path: path.resolve(
//     process.cwd(),
//     process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
//   ),
// });
console.log('API--------------------------------S');
console.log(process.env.mode);
console.log('API--------------------------------E');

app.use(express.json());
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  console.log('/api/test');
  // console.log('dotenv test : ', process.env);
  res.send('API Success!!');
})

app.use('/v1/test', require('./router/test'));
app.use('/v1/vtable', require('./router/table'));
app.use('/v1/code', require('./router/code'));

module.exports = {
  path: '/api',
  handler: app
}