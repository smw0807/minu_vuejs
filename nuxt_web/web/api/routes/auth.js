import express from 'express';
import authUtil from '../../utils/authenticate';
import elastic from '../../utils/elastic';
import authDb from '../../utils/redis';
const router = express.Router();

const access_time = 60;

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

module.exports = router;
