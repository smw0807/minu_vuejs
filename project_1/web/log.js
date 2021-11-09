require('winston-daily-rotate-file');
const appRoot = require('app-root-path');
const winston = require('winston');
const moment = require('moment');
const path = require('path');
//const PROJECT_ROOT = path.join(__dirname, '..');
const PROJECT_ROOT = path.join(__dirname);
const log_size = (process.env.LOG_SIZE_DAY) ? process.env.LOG_SIZE_DAY : "30";

module.exports = class Logd {
  constructor(name, num) {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.DailyRotateFile({
          filename: `${appRoot}/_logs/${name}.log`,
          colorize: true,
          maxFiles: num?num:log_size,
          format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] ${info.message}`)
        }),
        new winston.transports.Console({
          colorize: true,
          format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] ${info.message}`)
        })
      ]
    });
  }

  debug() {
    this.logger.debug.apply(this.logger, formatLogArguments(arguments));
  }

  log() {
    this.logger.debug.apply(this.logger, formatLogArguments(arguments));
  }

  info() {
    this.logger.info.apply(this.logger, formatLogArguments(arguments));
  }

  warn() {
    this.logger.warn.apply(this.logger, formatLogArguments(arguments));
  }

  error() {
    this.logger.error.apply(this.logger, formatLogArguments(arguments));
  }
}

function formatLogArguments(args) {
  args = Array.prototype.slice.call(args)

  var stackInfo = getStackInfo(1)

  if (stackInfo) {
    var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']'

    if (typeof (args[0]) === 'string') {
      args[0] = calleeStr + ' ' + args[0];
    } else {
      if (args[0].stack) {
        args[0] = calleeStr + ' ' + args[0].stack;
      } else {
        args[0] = calleeStr + ' ' + JSON.stringify(args[0]);
      }
    }
  }

  return args
}

function getStackInfo(stackIndex) {
  var stacklist = (new Error()).stack.split('\n').slice(3)

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  var s = stacklist[stackIndex] || stacklist[0]
  var sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      //relativePath: path.relative(PROJECT_ROOT, sp[2]),
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}