const fs = require('fs');
const aRoot = require('app-root-path');
const moment = require('moment');
const Logd = require(aRoot + '/log');
const log = new Logd('express');
const { workerData, parentPort } = require('worker_threads');
const elasticsearch = require('elasticsearch');
const es_client = new elasticsearch.Client({
  hosts: process.env.ES_HOST,
  ssl:{ rejectUnauthorized: false, pfx: [] } //node 버전 16 이상은 이거 안하니깐 엘라스틱서치 서버가 https일 때 에러뜸
})
const index_name = 'ni_file_manage';
const filePath = aRoot + '/static/csv/';

let app = new Map();
let appgroup = new Map();
let sensor = new Map();
let proto = new Map();

/**
 * file_name : 파일명
 * file_size : 파일 크기
 * file_mk_dt : 파일 생성일
 * file_state : 파일 처리 상태 
 * (0: 생성 대기중, 1: 생성중, 2: 생성완료, 3: 생성실패, 4: 생성 중지됨)
 * 0, 1 : 다운로드 버튼 비활성화, 중지 버튼 활성화
 * 2 : 다운로드 버튼 활성화, 삭제 버튼 활성화
 * 3 : 다운로드 버튼 비활성화, 삭제 버튼 활성화
 * 4 : 다운로드 버튼 비활성화, 삭제 버튼 활성화
 */
 async function run() {
  const sTime = new Date().getTime();
  try {
    let query = workerData.query;
    if (query.size == undefined) {
      query.size = 20000;
    }
    const user_id = workerData.user_id;
    const user_nm = workerData.user_nm;
    const type = workerData.type; //데이터 형식 type 이냐 아니냐 여부, 맞으면 true 아니면 false
    const idx_name = workerData.idx_name;
    const file_name = workerData.file_name.replace('.csv', '') + '_' + moment().format('YYYYMMDD-HHmmss') + '.csv';
    const headers = workerData.headers; // object, 표기할 필드 맵핑시킬 한글 정보 ex) { ip: '아이피', name: '이름' }
    const fields = workerData.fields; //array, 데이터 중에 csv에 표기할 필드 ex) ['ip', 'name']
    query._source = fields;
    let csv_header = '';
    await runMappingData(idx_name);
    //컬럼 셋팅
    fields.forEach((doc, index) => {
      csv_header += (index != fields.length - 1 ? (headers[doc] + ',') : (headers[doc] + '\r\n'));
    });
    // await runMappingData(idx_name);
    //파일 생성
    const file = filePath + file_name;
    const writeStream = fs.createWriteStream(file);
    writeStream.on('finish', () => {
      const eTime = new Date().getTime();
      //종료 업데이트
      console.log('csv 파일 쓰기 완료', (eTime - sTime) / 1000 + 's');
    });
    writeStream.write('\uFEFF' + csv_header);
    
    //엘라스틱에 등록
    const insert_es = await insertInfo(file_name, user_id, user_nm);
    //등록 여부 확인
    const check_file = await checkFile(file_name, '0');
    if (insert_es && check_file) {
      //검색
      let rs = await es_client.search({
        index: idx_name,
        type: '_doc',
        body: query,
        scroll: '5m'
      })
      let first = true;
      let state = true; //정상처리 여부
      //스크롤 검색
      while(rs.hits.hits.length > 0) {
        if (!first) {
          //첫 while문 사이클 이후 다시 돌기 전에 한번더 체크, 중간에 사용자가 생성 취소시 중단시키게
          const check = await checkFile(file_name, '1');
          if (!check) {
            state = false;
            let stat = fs.statSync(file);
            const fail = await updateFileInfo(file_name, stat.size, "4");
            break;
          }
        }
        first = false;
        let result = [];
        //데이터 변환
        if (type) {
          result.push(TypeData(rs));
        } else {
          result.push(noTypeData(rs));
        }
        //변환된 데이터를 csv 형식 string으로 변환 작업
        result.flat().forEach( (doc) => {
          let csv_string = '';
          for (let field of fields) {
            const test = data(doc[field], field);
            csv_string += doc[field] === undefined ? '' : test;
            csv_string += ',';
          }
          csv_string += '\r\n';
          // console.log(csv_string);
          writeStream.write('\uFEFF' + csv_string); //1개 row 마다 생성된 파일에 쓰기
        })
        //중간 업데이트
        let fileStat1 = fs.statSync(file);
        const upd = await updateFileInfo(file_name, fileStat1.size, "1"); 
        if (upd) { //중간 업데이트 성공시
          rs = await es_client.scroll({ scrollId: rs._scroll_id, scroll: '5m'});
        } else { //중간 업데이트 실패시
          state = false;
          const fail = await updateFileInfo(file_name, fileStat2.size, "3");
          break;
        }
      }
      writeStream.end(); //파일 쓰기 종료
      if (state) {
        let fileStat2 = fs.statSync(file);
        let upd = await updateFileInfo(file_name, fileStat2.size, "2");
      }
    } else {
      writeStream.end();
      let fileStat3 = fs.statSync(file);
      let upd = await updateFileInfo(file_name, fileStat3.size, "3");
    }
    parentPort.close(); //워커 종료
  } catch (err) {
    log.error(err);
    console.error(err);
    parentPort.close();
  }
}

//파일 정보 엘라스틱에 등록 (file_state : 0)
async function insertInfo (name, uid, unm) {
  try {
    const b = {
      user_id: uid,
      user_nm: unm,
      file_name: name,
      file_size: 0,
      file_state: '0',
      file_mk_dt : moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const rs = await es_client.index({
      index: index_name,
      type: '_doc',
      body: b
    })
    return true;
  } catch (err) {
    log.error(err);
    console.error(err);
    return false;
  }
}
//엘라스틱에 파일 등록 여부 확인
async function checkFile (name, state) {
  try {
    const query = {
      query :{
        bool: {
          filter:[
            {
              term:{
                file_name: name
              }
            },
            {
              term:{
                file_state: state
              }
            }
          ]
        }
      }
    }
    const rs = await es_client.count({
      index: index_name,
      type: '_doc',
      body: query
    })
    if (rs.count === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    log.error(err);
    console.error(err);
    return false;
  }
}
/** 엘라스틱에 등록된 파일 중간 업데이트
 * 생성중 - file_state : 1, file_size update
 * 성공시 - file_state : 2, file_size update
 * 실패시 - file_state : 3, file_size update
 * @param {*} name 파일명
 * @param {*} size 파일 사이즈
 * @param {*} state 파일 처리 상태
 */
async function updateFileInfo (name, size, state) {
  try {
    const rs = await es_client.updateByQuery({
      index: index_name,
      type: '_doc',
      refresh: true,
      body: {
        script: {
          source: `ctx._source["file_state"]="${state}";ctx._source["file_size"]=${size}` 
        },
        query:{
          term: {
            file_name: name
          }
        }
      }
    })
    return true;
  } catch (err) {
    log.error(err);
    console.error(err);
    return false;
  }
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

//혹시 데이터 포맷이 필요할 경우를 대비해서 만듬
function data(data, field) {
  if (typeof data == 'object') {
    return '\"' +  JSON.stringify(data).replace(/"/g, '') + '\"';
  }
  else if (field === 'app') {
    return app.get(parseInt(data));
  } else if (field === 'app_grp') {
    return appgroup.get(parseInt(data));
  } else if (field === 'proto') {
    return proto.get(String(data));
  } else if (field === 'sensor_id') {
    return sensor.get(parseInt(data));
  }
  else {
    return '\"' + data + '\"';
  }
}

//==============================================================================================
async function runMappingData(idx) {
  if (idx.indexOf('ni_raw_flw') !== -1) {
    if (app.size === 0) await makeApp()
    if (appgroup.size === 0) await makeAppgroup()
    if (proto.size === 0) await makeProto()
    if (sensor.size === 0) await makeSensor()
  }
}
//응용 데이터 생성
async function makeApp() {
  try {
    let query = {
      "size": 2000,
      "_source": [ "type","app.app_code","app.app_nm"],
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "type": "app"
              }
            },
            {
              "term": {
                "app.is_use": true
              }
            }
          ]
        }
      }
    }
    const rs = await searchScroll('ni_setting', query, true);
    for (let item of rs.flat()) {
      app.set(item.app_code, item.app_nm);
    }
  } catch (err) {
    log.error(err);
    console.error(err);
  }
}

//응용그룹 데이터 생성
async function makeAppgroup() {
  try {
    let query = {
      "size": 2000,
      "_source": [ "type","appgroup.appgroup_code","appgroup.appgroup_nm"],
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "type": "appgroup"
              }
            },
            {
              "term": {
                "appgroup.is_use": true
              }
            }
          ]
        }
      }
    }
    const rs = await searchScroll('ni_setting', query, true);
    for (let item of rs.flat()) {
      appgroup.set(item.appgroup_code, item.appgroup_nm);
    }
  } catch (err) {
    log.error(err);
    console.error(err);
  }
}

//프로토콜 데이터 생성
async function makeProto() {
  try {
    let query = {
      "size": 2000,
      "_source": [ "type","cmn_code.code", "cmn_code.name"],
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "type": "cmn_code"
              }
            },
            {
              "term": {
                "cmn_code.pcode": "proto"
              }
            },
            {
              "term": {
                "cmn_code.is_use": true
              }
            }
          ]
        }
      }
    }
    const rs = await searchScroll('ni_manage', query, true);
    for (let item of rs.flat()) {
      proto.set(item.code, item.name);
    }
  } catch (err) {
    log.error(err);
    console.error(err);
  }
}

//수집장비 데이터 생성
async function makeSensor() {
  try {
    let query = {
      "size": 2000,
      "_source": ["type", "equip.equip_id", "equip.equip_alias"],
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "type": "equip"
              }
            },
            {
              "term": {
                "equip.is_use": true
              }
            }
          ]
        }
      }
    }
    const rs = await searchScroll('ni_manage', query, true);
    for (let item of rs.flat()) {
      sensor.set(item.equip_id, item.equip_alias);
    }
  } catch (err) {
    log.error(err);
    console.error(err);
  }
}

async function searchScroll(idx, query, is_type) {
  let result = [];
  try {
    let rs = await es_client.search({
      index: idx,
      type: '_doc',
      body: query,
      scroll: '1m'
    })
    while(rs.hits.hits.length > 0) {
      if (is_type) {
        result.push(TypeData(rs));
      } else {
        result.push(noTypeData(rs));
      }
      rs = await es_client.scroll({ scrollId: rs._scroll_id, scroll: '1m'});
    }
  } catch (err) {
    log.error(err);
    console.error(err);
  }
  return result;
}

run();