import express from 'express';
import bodyParser from 'body-parser';

const app = express();
global.userMap = new Map();

app.use(express.json());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log('/api/');
  res.send('API test');
})

app.use('/v1/login', require('./router/login'));
app.use('/v1/setting/user', require('./router/setting/user'));

module.exports = {
  path: '/api',
  handler: app
}