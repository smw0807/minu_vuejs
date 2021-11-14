import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const moment = require('moment');

const { singleFlatMap } = require(aRoot + '/utils/elastic').default;

//https://github.com/expressjs/multer/blob/master/doc/README-ko.md
const multer =require('multer');
const storage = multer.memoryStorage(); //파일을 메모리에 Buffer 객체로 저장함
const upload = multer({ storage: storage}); //파일을 메모리에 Buffer 객체로 저장함
// const upload = multer({dest: aRoot + '/api/files/'}); //파일을 저장할 폴더

const index_name = 'idx_file';

//엘라스틱서치에 등록된 파일 리스트 불러오기
router.post('/list', async (req, res) => {
  let rt = {};
  try {
    const fields = [
      'file_name',
      'file_size',
      'file_mk_dt'
    ]
    const q = {
      _source: fields,
      query : {
        bool:{
          must:[
            
          ]
        }
      }
    }
    let rs = await es_client.search({
      index: index_name,
      type: '_doc',
      body: q,
    })
    console.log(rs);
    rt.error = false;
    rt.result = singleFlatMap(rs);
  } catch (err) {
    console.lof(err);
    rt.error = true;
    rt.result = err;
  }
  res.send(rt);
});

//엘라스틱서치에 파일 등록하기
//upload.single 안에 formData에서 넣은 파일 이름으로.
router.post('/file_upload', upload.single('file'), async (req, res) => {
  console.log('/api/v1/file/file_upload');
  let rt = {};
  try {
    const file_info = req.file;
    console.log(file_info);
    /** 내부 저장 방식일 경우
     * 1. 변환된 filename을 변수에 저장.
     * 2. 엘라스틱서치에 등록
     * 3. 1번의 값으로 파일 삭제
     */

    /**
     * 메모리 저장 방식일 경우
     * 1. buffer 값을 binary로 변환?
     */
    const fileName = file_info.originalname;
    const fileSize = file_info.size;
    const file_mk_dt = moment().format('YYYY-MM-DD HH:mm:ss');
    const fileContent = file_info.buffer.toString('base64');
    console.log(fileContent);
    console.log('----------');
    // console.log(new Buffer.from(fileContent, 'base64'.toString('utf-8')));  
    const data = {
      file_name : fileName,
      file_size : fileSize,
      file_content : fileContent,
      file_mk_dt : file_mk_dt
    }
    const rs = await es_client.index({
      index: index_name,
      type : '_doc',
      body: data
    });
    console.log(rs);
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});


//엘라스틱서치에 파일 여러개 등록하기
router.post('/file_multi_upload', upload.array(), async (req, res) => {
  console.log('api/v1/file/file_multi_upload');
  let rt = {};
  try {

  } catch (err) {

  }
  res.send(rt);
})

module.exports = router;

/**
메모리에 저장시 데이터
{                                                                                                                                                                                                                                                                                                              09:57:24
  fieldname: 'file',
  originalname: 'ts_ai_result-2021-ntm-hits.json',
  encoding: '7bit',
  mimetype: 'application/json',
  buffer: <Buffer 7b 0d 0a 20 20 20 20 22 74 6f 6f 6b 22 3a 20 35 2c 0d 0a 20 20 20 20 22 74 69 6d 65 64 5f 6f 75 74 22 3a 20 66 61 6c 73 65 2c 0d 0a 20 20 20 20 22 5f ... 361208 more bytes>,
  size: 361258
}

내부에 저장시 데이터
{                                                                                                                                                                                                                                                                                                              09:58:29
  fieldname: 'file',
  originalname: 'ts_ai_result-2021-ntm-hits.json',
  encoding: '7bit',
  mimetype: 'application/json',
  destination: 'C:\\smw\\minu_vuejs\\project_1\\web/api/files/',
  filename: '83061b6f744f794254cee8b781ce0c5b',
  path: 'C:\\smw\\minu_vuejs\\project_1\\web\\api\\files\\83061b6f744f794254cee8b781ce0c5b',
  size: 361258
}
 */