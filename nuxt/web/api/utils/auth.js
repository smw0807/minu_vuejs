import jwt from 'jsonwebtoken'
const ACCESS = 'netcoretech@@snrnsi@@#$sjs';
const REFRESH = 'nct@@2djfdkstla**#';

const access_time = 60;
const refresh_time = 60 * 60;

//access_token 생성
function makeAccessToken (v) {
  // console.log('auth : ', v);
  return new Promise( (resolve, reject) => {
    const token = jwt.sign(v,  ACCESS, {expiresIn: '60s'}, (err, token) => {
      if (err) {
        console.log('makeAccessToken Error : ', err);
        reject(err);
      } else {
        resolve(token);
      }
    })
  });
}

//refresh_token 생성
function makeRefreshToken (v) {
  // console.log('auth : ', v);
  return new Promise( (resolve, reject) => {
    const token = jwt.sign(v,  REFRESH, {expiresIn: '1h'}, (err, token) => {
      if (err) {
        console.log('makeRefreshToken Error : ', err);
        reject(err);
      } else {
        resolve(token);
      }
    })
  });
}

module.exports = {
  makeAccessToken,
  makeRefreshToken
}