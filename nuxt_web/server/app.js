var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const elastic = require('./util/elastic');


var indexRouter = require('./routes/index');




var app = express();

// elastic.cat.health({}).then(function(err){  
//   console.info(err);
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/movies', require('./routes/movies'));
app.use('/v1/auth', require('./routes/auth'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
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


module.exports = app;
