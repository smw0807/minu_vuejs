const aPath = require('app-root-path');
const express = require('express');
const authUtil = require('../util/authenticate');
const { ingest } = require('../util/elastic');
const elastic = require('../util/elastic');
const authDb = require(`${aPath}/util/redis`);
const router = express.Router();

const access_time = 60;
//const redis = require('redis');
//const authDb = redis.createClient(6379, '192.168.1.12');


/* GET users listing. */
router.get('/', async function (req, res, next) {
  //console.info(req);

  //console.info(req.params);
  //console.info(req.query);

  const token = req.headers['x-access-token'];

  let vvv = await authUtil.decodedToken(token);
  console.info(vvv);


  //let ss = await authUtil.certifyAccessToken(token);
  //console.info(ss);

  const value = await authDb.get(vvv.uid);
  //console.log("rrrrrrrrrrrrrrrrrrrr ::: "+value);

  res.send({});
  //res.send('respond with a resource');
});

router.post('/login', async function (req, res, next) {
  const { uid, pass } = req.body;

  console.info(uid);
  console.info(pass);

  let rt = await elastic.search({
    index: "test_user",
    body: {
      size: 1,
      query: {
        term: {
          "user": uid
        }
      }
    }
  })

  let row;
  if (rt.hits.hits) {
    row = rt.hits.hits[0]
  }
  console.info(row._source.pass);
  const isMatchPassword = authUtil.certifyPassword(pass, row._source.pass);


  if (isMatchPassword) {
    let r_time = (60 * 60); //1시간
//let r_time = 5;
    const accessToken = authUtil.generateAccessToken({ uid }, access_time);
    const refreshToken = authUtil.generateRefreshToken({ uid, pass }, r_time);

    await authDb.set(uid, refreshToken);
    await authDb.expire(uid, r_time );

    let rt = {
      auth_info: { accessToken, refreshToken },
      msg: "ok"
    }
    //console.info(req.query);    
    res.status(200).json(rt);
  } else {
    res.status(401).json({
      msg: "fail"
    });
  }
});

router.post('/certify', async (req, res, next) => {
  let rt_status = 401;
  let rt_msg = { msg: "auth fail" };
  const refreshToken = req.headers['x-refresh-token'];

  let token = await authUtil.decodedToken(refreshToken);
  console.info(token);


  if (token) {
    let uid = token.uid;
    let matchToken = await authDb.get(uid);
    if (matchToken) {  
      if (refreshToken === matchToken) {
        const accessToken = authUtil.generateAccessToken({ uid }, access_time);

        rt_status = 200;
        rt_msg = {
          auth_info: { accessToken, refreshToken },
          msg: "ok"
        }
      }
    }    
  }

  res.status(rt_status).json(rt_msg);
});

router.post('/certify1', async (req, res, next) => {
  const refreshToken = req.headers['x-refresh-token'];

  // res.status(401).json({
  //   msg:"fail"
  // });


  console.info("refreshToken : " + refreshToken);
  authUtil.decodedToken(refreshToken).then(res1 => {
    console.info("11111111111111111111111111111");
    console.info(res1);



    //let ppp = authenticateUtils.encryptPassword(pass);   
    //let vvv = await authUtil.decodedToken(refreshToken);

    authUtil.certifyRefreshToken(refreshToken, "aaaa").then(r => {

      console.info(r);
      console.info("-----------------2");


      let uid = r.uid;
      let upk = "1";
      let role = "1";
      let position = "1";

      const accessToken = authUtil.generateAccessToken({ uid, upk, role, position });
      let rt = {
        auth_info: { uid, role, position, accessToken, refreshToken },
        msg: "ok"
      }
      //console.info(req.query);
      //res.send('respond with a resource');

      res.status(200).json(rt);
    }).catch(err => {
      console.info(err);
      console.info("-----------------3");
      res.status(401).json({
        msg: "fail"
      });
    });
  });
});

module.exports = router;
