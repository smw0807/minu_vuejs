import createError from 'http-errors';
import express from 'express';
import aPath from 'app-root-path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
// import elastic from `${aPath}/utils/elastic.js`
import elastic from '../utils/elastic.js'

// express 인스턴스 생성
const app = express()

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.get('/', function(req, res) {
  res.send('API root');
})

app.get('/test', function(req, res) {
  res.send('API test');
})

app.use('/v1/movies', require('./routes/movies'));
app.use('/v1/auth', require('./routes/auth'));

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


async function run() {
  console.info("################################### 33333");
  await elastic.indices.create({
    index: 'test_user',
    body: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          user: { type: 'keyword' },
          pass: { type: 'keyword' },
          text: { type: 'text' },
          time: { type: 'date' }
        }
      }
    }
  }, { ignore: [400] })

  console.info("################################### 22222");

  const dataset = [{
    id: 1,
    text: 'If I fall, don\'t bring me back.',
    user: 'a',
    pass: '$2a$05$Xnub6Zi3YXoSRWxrMlByhe1G3KszkQlukEkxsjvrjtyeS0mOBTSka', //bbb
    date: new Date()
  }, {
    id: 2,
    text: 'Witer is coming',
    user: 'ned',
    pass: '$2a$05$.XGvmrVEVhH5L07PKLcHMO4qVsq5OEvpENlyCPdrBsv58oCvLyzyK',
    date: new Date()
  }, {
    id: 3,
    text: 'A Lannister always pays his debts.',
    user: 'b',
    pass: '$2a$05$bl4A3cRs9K7GkGxsoimmCeZQ3yIK3KPsllhAFUZAtry4luZgZD.YC',
    date: new Date()
  }]

  const body = dataset.flatMap(doc => [{ index: { _index: 'test_user' } }, doc])

  console.info(body);

  const { body: bulkResponse } = await elastic.bulk({ refresh: true, body })

  //console.info(bulkResponse)
  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  // const { body: count } = await client.count({ index: 'tweets' })
  // console.log(count)
}

run().catch(console.log)
// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: '/api',
  handler: app
}