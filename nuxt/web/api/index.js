import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log('/api/');
  res.send('API test');
})

app.use('/mg', require('./router/mongo'));
app.use('/es', require('./router/elastic'));
module.exports = {
  path: '/api',
  handler: app
}