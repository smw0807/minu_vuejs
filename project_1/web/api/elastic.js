import elasticsearch from 'elasticsearch'
const es_client = new elasticsearch.Client({
  hosts: [
    'http://minu0807.iptime.org:9200'
  ]
})
module.exports = es_client;