
import config from '../api/sv.config';
import asyncRedis from "async-redis";
const authDb = asyncRedis.createClient(6379, '192.168.3.61');

module.exports = authDb;