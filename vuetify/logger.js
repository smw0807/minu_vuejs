import path from 'path'
const logger = function () {
  let logDate
  let file

  const fs = require('fs')
  const util = require('util')
  const moment = require('moment')
  const dir = path.normalize(__dirname + '/logs/');

  if (!fs.existsSync(dir)){ //디렉터리가 없으면 생성
    fs.mkdirSync(dir);
  }
  function getLogger() {
    var logStdout = process.stdout
    return function () {
      let now = moment().format('YYYY-MM-DD')
      if (logDate !== now) file = getFile(now)
      logStdout.write(util.format.apply(null, arguments) + '\n')

      file.write(`[${moment().format('YYYY-MM-DD HH:mm:ss SSS')}]`)
      file.write(util.format.apply(null, arguments) + '\n')
    }
  }

  function init() {
    const customLogger = getLogger()

    console.log = customLogger
    console.error = customLogger
    console.debug = customLogger
    console.log('[LOGGER] init ... ')
  }

  function getFile(date) {
    const path = dir + date + '.txt'
    /** Or 'w' to truncate the file every time the process starts. */
    file = fs.createWriteStream(path, {flags: 'a'})
    return file
  }

  return {
    init: init
  }
}()
// logger.init()
export default {
  logger
}
