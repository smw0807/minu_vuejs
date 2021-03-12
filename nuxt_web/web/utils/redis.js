
const aPath = require('app-root-path');
const config = require(`${aPath}/sv.config`);
const asyncRedis = require("async-redis");
const authDb = asyncRedis.createClient(6379, '192.168.3.61');

module.exports = authDb;