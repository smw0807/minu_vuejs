import crypto from 'crypto'

/**
 * 전달 받은 데이터 sha256으로 암호화해서 반환
 */
function sha256 (val) {
  try {
    let rs = crypto.createHash('sha256').update(val).digest('hex');
    return rs;
  } catch (err) {
    console.error('utils/sha256.js -> sha256 Error', err);
    return false;
  }
}

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

export default {
  sha256,
  salt_sha256
}