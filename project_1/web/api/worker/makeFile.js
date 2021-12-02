const fs = require('fs');
const aRoot = require('app-root-path');
const moment = require('moment');
const Logd = require(aRoot + '/log');
const log = new Logd('express');
const { workerData, parentPort } = require('worker_threads');
const elasticsearch = require('elasticsearch');
const es_client = new elasticsearch.Client({
  hosts: String(process.env.ES_HOST).split(',')
})
const index_name = 'ni_manage';
const filePath = aRoot + '/static/file/';

/**
 * file_name : 파일명
 * file_size : 파일 크기
 * file_mk_dt : 파일 생성일
 * file_state : 파일 처리 상태 (0: 생성중, 1: 생성완료, 2: 생성실패, 3: 생성 중지됨)
 * 0 : 다운로드 버튼 비활성화, 중지 버튼 활성화
 * 1 : 다운로드 버튼 활성화, 삭제 버튼 활성화
 * 2 : 다운로드 버튼 비활성화, 삭제 버튼 활성화
 * 3 : 다운로드 버튼 비활성화, 삭제 버튼 활성화
 */

//파일 정보 엘라스틱에 등록 (file_state : 0)
async function insertInfo (v) {

}
//엘라스틱에 파일 등록 여부 확인
async function checkFile (v) {

}
/** 엘라스틱에 등록된 파일 중간 업데이트
 * file_state : 0, file_size -> update
 * @param {*} name 파일명
 * @param {*} size 파일 사이즈
 */
async function updateRunningInfo (name, size) {

}
/** 엘라스틱에 등록된 파일 종료 업데이트
 * 성공시 - file_state : 1, file_size update
 * 실패시 - file_state : 2, file_size update
 * @param {*} name 파일명
 * @param {*} state 파일 처리 상태
 * @param {*} size 파일 사이즈
 */
async function updateFinishInfo (name, state, size) {

}

//type 형식 데이터
function TypeData (data) {
  let rt = data.hits.hits.flatMap( (doc) => {
    let d = {};
    d.type = doc._source.type;
    let key = Object.keys(doc._source.type);
    let val = doc._source[doc._source.type];
    for (key in val) {
      d[key] = val[key];
    }
    return d;
  })
  return rt;
}

//type 형식 아닌 데이터
function noTypeData (data) {
  let rt = data.hits.hits.flatMap( (doc) => {
    let d= {};
    let key = Object.keys(doc._source);
    let val = doc._source;
    for (key in val) {
      d[key] = val[key];
    }
    return d;
  });
  return rt;
}

//옥시 데이터 포맷이 필요할 경우를 대비해서 만듬
function data(data) {
  let rt = '';
  if (typeof data == 'object') {
    return '\"' +  JSON.stringify(data).replace(/"/g, '') + '\"';
  }
  else {
    rt = data;
  }
  return '\"' + rt + '\"';
}

async function run() {
  const sTime = new Date().getTime();
  try {
    let query = workerData.query;
    if (query.size == undefined) {
      query.size = 20000;
    }
    const type = workerData.type; //데이터 형식 type 이냐 아니냐 여부, 맞으면 true 아니면 false
    const idx_name = workerData.idx_name;
    // const file_name = workerData.file_name + '_' + new Date().getTime() + '.csv';
    const file_name = workerData.file_name.replace('.csv', '') + '_' + moment().format('YYYYMMDD-HHmmss') + '.csv';
    const headers = workerData.headers; // object, 표기할 필드 맵핑시킬 한글 정보 ex) { ip: '아이피', name: '이름' }
    const fields = workerData.fields; //array, 데이터 중에 csv에 표기할 필드 ex) ['ip', 'name']
    query._source = fields;

    let csv_header = '';
    //컬럼 셋팅
    fields.forEach((doc, index) => {
      csv_header += (index != fields.length - 1 ? (headers[doc] + ',') : (headers[doc] + '\r\n'));
    });

    //파일 생성
    const file = filePath + file_name;
    const writeStream = fs.createWriteStream(file);
    writeStream.on('finish', () => {
      const eTime = new Date().getTime();
      console.log('파일 쓰기 완료', (eTime - sTime) / 1000 + 's');
    });
    writeStream.write('\uFEFF' + csv_header);
    
    //검색
    let rs = await es_client.search({
      index: idx_name,
      type: '_doc',
      body: query,
      scroll: '5m'
    })

    //스크롤 검색
    while(rs.hits.hits.length > 0) {
      let result = [];
      //데이터 변환
      if (type) {
        result.push(TypeData(rs));
      } else {
        result.push(noTypeData(rs));
      }
      //변환된 데이터를 csv 형식 string으로 변환 작업
      result.flat().forEach((doc) => {
        let csv_string = '';
        for (let item of fields) {
          csv_string += doc[item] === undefined ? '' : data(doc[item]);
          csv_string += ',';
        }
        csv_string += '\r\n';
        writeStream.write('\uFEFF' + csv_string); //1개 row 마다 생성된 파일에 쓰기

      })
      rs = await es_client.scroll({ scrollId: rs._scroll_id, scroll: '5m'});
    }
    writeStream.end(); //파일 쓰기 종료
    parentPort.close(); //워커 종료
  } catch (err) {
    log.error(err);
    console.error(err);
    parentPort.close();
  }
}
run();