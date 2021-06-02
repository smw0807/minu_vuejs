import elasticsearch from 'elasticsearch'
const es_client = new elasticsearch.Client({
  hosts: [
    // 'https://test:test1234@192.168.3.21:8200'
    'http://localhost:9200'
    // 'http://192.168.0.21:9200'
    // 'http://minu0807.iptime.org:9200'
  ]
})
module.exports = es_client;