//const bcrypt = require('bcrypt-nodejs');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ACCESS_KEY = 'dpdptmflow_netcoretech#ghazlvk11';
const REFRESH_KEY = 'flvmffptnlflow_netcoretech#ghazlvk11';

function certifyAccessToken(token) {
  //console.info("certifyAccessToken : ", token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function certifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function authCheck(reqAuth = []) {
  return async function(req, res, next) {
    const token = req.headers['x-access-token'];
    try {
      //로그인 체크
      let { auth_id } = await certifyAccessToken(token);
      //사용자 권한 체크
      if (reqAuth.length > 0) {
        //화이트리스트
        if (reqAuth.includes(auth_id)) {
          return next();
        } else {
          console.info(
            `auth_id:${auth_id} doesn't have permission to this request.`
          );
          res.status(403).json({ msg: '권한이 없습니다.' });
        }
      } else {
        return next();
      }
    } catch (err) {
      console.info('authCheck.err : ', err);
      res.status(401).json({ msg: '로그인이 필요합니다.' });
    }
  };
}

function certifyPassword(requestPassword, storedPassword) {
  //return  bcrypt.compareSync(requestPassword,storedPassword);
  //this.encryptPassword(

  return bcrypt.compareSync(requestPassword, storedPassword);
}

function encryptPassword(password) {
  return bcrypt.hashSync(password, 5);
}

function generateAccessToken(information, time) {
  const { uid, auth_id } = information;
  //return jwt.sign(information, secretKey, { expiresIn: '1m' });
  return jwt.sign({ uid, auth_id }, ACCESS_KEY, { expiresIn: time });
}

function generateRefreshToken(information, time) {
  const { uid, pass, auth_id } = information;
  return jwt.sign({ uid, auth_id }, REFRESH_KEY, { expiresIn: time });
}

function getUid(token) {
  if (token) {
    try {
      let decoded = jwt.decode(token);
      return decoded.uid;
    } catch (err) {
      console.error(err);
      return null;
    }
  } else {
    return null;
  }
}

module.exports = {
  certifyAccessToken,
  certifyRefreshToken,
  authCheck,
  certifyPassword,
  encryptPassword,
  generateAccessToken,
  generateRefreshToken,
  getUid
};
