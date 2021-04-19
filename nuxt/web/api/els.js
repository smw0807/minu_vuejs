import path from 'path'
import elasticsearch from 'elasticsearch'

const  { es }  = require(path.resolve('apiConfig')).default;

const url = es.host;

const es_client = new elasticsearch.Client({hosts: [url]});

module.exports = es_client;