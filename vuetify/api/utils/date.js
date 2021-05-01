import moment from 'moment'

/**
 * 받은 포맷 형식으로 현재 시간을 반환해줌
 * @param {*} format 
 * @returns 
 */
function makeDate (format) {
  try {
    const today = moment();
    return today.format(format);
  } catch (err) {
    console.error('/utils/date.js -> makeDate', err);
    return false;
  }
}

module.exports = {
  makeDate
}