import crypto from 'crypto'

/**
 * solt : 암호화 할 때 첨부할 데이터
 * val : 암호화할 데이터
 */
function salt_sha256(val, salt) {
  try {
    let rs = crypto.createHash('sha256').update(val + salt).digest('hex');
    return rs;
  } catch (err) {
    console.error('utils/sha256.js -> salt_sha256 Error', err);
    return false;
  }
}
//슬릭
function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
};


export default {
  salt_sha256,
  sleep
}