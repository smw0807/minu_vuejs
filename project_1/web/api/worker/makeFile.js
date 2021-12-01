const elasticsearch = require('elasticsearch');
const es_client = new elasticsearch.Client({
  hosts: [
    process.env.ES_HOST
  ]
})
const fs = require('fs');
const aRoot = require('app-root-path');
const { workerData, parentPort } = require('worker_threads');
const filePath = aRoot + '/static/file/';

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms * 1000);
  })
};

function singleFlatMap (data) {
  let rt = data.hits.hits.flatMap( (doc) => {
    let d= {};
    d._index = doc._index;
    d._id = doc._id;
    let key = Object.keys(doc._source);
    let val = doc._source;
    for (key in val) {
      d[key] = val[key];
    }
    return d;
  });
  return rt;
}

async function run() {
  console.log('worker/makeFile.js start', workerData);
  try {
    parentPort.postMessage('start');
    let query = workerData.query;
    query.size = 5000;
    const idx_name = workerData.index_name;
    const file_name = workerData.file_name;
    const headers = workerData.headers; // object, 표기할 필드 맵핑시킬 한글 정보 ex) { ip: '아이피', name: '이름' }
    const fields = workerData.fields; //array, 데이터 중에 csv에 표기할 필드 ex) ['ip', 'name']
    
    const file = filePath + file_name;
    const writeStream = fs.createWriteStream(file);
    writeStream.on('finish', () => {
      console.log('파일 쓰기 완료');
    });
    parentPort.postMessage('make file');
    let rs = await es_client.search({
      index: idx_name,
      type: '_doc',
      body: query,
      scroll: '5m'
    })
    parentPort.postMessage('search start');
    let result = [];
    while(rs.hits.hits.length > 0) {
      parentPort.postMessage('while running....');
      // writeStream.write(singleFlatMap(rs));
      result.push(singleFlatMap(rs));
      rs = await es_client.scroll({ scrollId: rs._scroll_id, scroll: '1m'});
    }
    if (result.length > 0) {
      let csv_string = '';
      //컬럼 셋팅
      fields.forEach((doc, index) => {
        csv_string += (index != fields.length - 1 ? (headers[doc] + ',') : (headers[doc] + '\r\n'));
      });
      console.log(csv_string);
      // writeStream.write(csv_string);
      //데이터 셋팅
      result.forEach( (doc, index) => {
        let row = '';
        console.log(doc);
      });
      

    }

    // parentPort.postMessage('while finish');
    // parentPort.postMessage('file start');
    // writeStream.write(result);
    // writeStream.end();
    parentPort.postMessage('file finish');
    parentPort.postMessage(file_name);
    // fs.writeFileSync(file, JSON.stringify(result), 'utf-8');

  } catch (err) {
    console.error(err);
  }
  console.log('worker/makeFile.js end');
}
run();