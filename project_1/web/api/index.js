import express from 'express'
import bodyParser from 'body-parser'

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  console.log('/api/test');
  res.send('API Success!!');
})

module.exports = {
  path: '/api',
  handler: app
}