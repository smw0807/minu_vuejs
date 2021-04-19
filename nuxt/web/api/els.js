// const path = require('path');
// const apiCong = require(path.join(__dirname, '..', 'apiConfig'));
// const elasticsearch = require('elasticsearch');

// import path from 'path'

import elasticsearch from 'elasticsearch'

const url = 'https://test:test1234@192.168.3.21:8200';
// const url = 'http://minu0807.iptime.org:9200';

const es_client = new elasticsearch.Client({hosts: [url]});

module.exports = es_client;