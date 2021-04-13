const path = require('path');
const apiCong = require(path.join(__dirname, '..', 'apiConfig'));
const elasticsearch = require('elasticsearch');

// const url = 'https://test:test@192.168.1.23:9200';
// const url = 'http://minu0807.iptime.org:9200';

const es_client = new elasticsearch.Client({hosts: apiCong.es});

module.exports = es_client;