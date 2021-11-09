import express from 'express'
import aRoot from 'app-root-path'

const router = express.Router();
const es_client = require(aRoot + '/api/elastic');
const moment = require('moment');

const multer =require('multer');
const upload = multer({dest: '../files/'});
// const upload = multer({dest: aRoot + '/api/files/'});

const index_name = 'idx_file';

//엘라스틱서치에 등록된 파일 리스트 불러오기
router.post('/list', async (req, res) => {

});

//엘라스틱서치에 파일 등록하기
// router.post('/file_upload', upload.single(), async (req, res) => {
router.post('/file_upload', async (req, res) => {
  // console.log(upload);
  // upload(req, res, (err) => {
  //   console.log(req);
  // })
  console.log('/api/v1/file/file_upload');
  let rt = {};
  try {
    const params = req.file;
    console.log(params);
  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = 'err';
    rt.result = err.message;
  }
  res.send(rt);
});

module.exports = router;